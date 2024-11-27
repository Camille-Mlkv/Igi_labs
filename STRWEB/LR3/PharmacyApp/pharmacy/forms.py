from datetime import date
import re
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction
from django.forms.utils import ValidationError

from pharmacy.models import SliderSettings, User,Medication,PharmacyDepartment,Supplier,PickupPoint,Purchase,Customer,Admin,Employee,FeedBack



class CustomerSignUpForm(UserCreationForm):

    phone_number = forms.CharField(max_length=18)
    birth_date = forms.DateField()
    email = forms.EmailField(max_length=254)
    first_name = forms.CharField(max_length=150)  # Имя
    last_name = forms.CharField(max_length=150)   # Фамилия
    patronymic = forms.CharField(max_length=150, required=False)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'first_name', 'last_name', 'patronymic','email','phone_number', 'birth_date')

    def clean_birth_date(self):
        birth_date = self.cleaned_data['birth_date']
        age = (date.today() - birth_date).days // 365
        if age < 18:
            raise ValidationError("You must be at least 18 years old to register.")
        return birth_date

    def clean_phone_number(self):
        phone_number = self.cleaned_data['phone_number']
        if not re.match(r'^\+375 \d{2} \d{3} \d{2} \d{2}$', phone_number):
            raise ValidationError("Phone number must be in the format +375 -- --- -- --.")
        return phone_number
    
    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_customer = True
        user.first_name = self.cleaned_data['first_name']  # Сохраняем имя
        user.last_name = self.cleaned_data['last_name']    # Сохраняем фамилию
        user.patronymic = self.cleaned_data['patronymic']  # Сохраняем отчество
        user.email = self.cleaned_data['email']  
        user.birth_date=self.cleaned_data['birth_date']
        user.phone_number=self.cleaned_data['phone_number']
        user.save()
        customer=Customer.objects.create(
            user=user,
        )
        return user
    

class EmployeeSignUpForm(UserCreationForm):

    phone_number = forms.CharField(max_length=18)
    birth_date = forms.DateField()
    photo = forms.ImageField(required=False)
    first_name = forms.CharField(max_length=150)  # Имя
    last_name = forms.CharField(max_length=150)   # Фамилия
    patronymic = forms.CharField(max_length=150, required=False)
    email = forms.EmailField(max_length=254)
    job_description=forms.CharField(max_length=200)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'first_name', 'last_name', 'patronymic','email','phone_number', 'birth_date','photo','job_description')

    def clean_birth_date(self):
        birth_date = self.cleaned_data['birth_date']
        age = (date.today() - birth_date).days // 365
        if age < 18:
            raise ValidationError("You must be at least 18 years old to register.")
        return birth_date

    def clean_phone_number(self):
        phone_number = self.cleaned_data['phone_number']
        if not re.match(r'^\+375 \d{2} \d{3} \d{2} \d{2}$', phone_number):
            raise ValidationError("Phone number must be in the format +375 -- --- -- --.")
        return phone_number
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_employee= True
        user.first_name = self.cleaned_data['first_name']  # Сохраняем имя
        user.last_name = self.cleaned_data['last_name']    # Сохраняем фамилию
        user.patronymic = self.cleaned_data['patronymic']  # Сохраняем отчество
        user.email = self.cleaned_data['email']  
        user.birth_date=self.cleaned_data['birth_date']
        user.phone_number=self.cleaned_data['phone_number']
        if commit:
            user.save()
            employee_profile = Employee.objects.create(
                user=user,
                photo=self.cleaned_data['photo'],
                job_description=self.cleaned_data['job_description'],
            )
        return user
    
# class AdminSignUpForm(UserCreationForm):

#     class Meta(UserCreationForm.Meta):
#         model = User

#     def save(self, commit=True):
#         user = super().save(commit=False)
#         user.is_admin= True
#         if commit:
#             user.save()
#         return user

class AdminSignUpForm(UserCreationForm):
    phone_number = forms.CharField(max_length=18)
    birth_date = forms.DateField()
    email = forms.EmailField(max_length=254)
    first_name = forms.CharField(max_length=150)  # Имя
    last_name = forms.CharField(max_length=150)   # Фамилия
    patronymic = forms.CharField(max_length=150, required=False)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'first_name', 'last_name', 'patronymic','email','phone_number', 'birth_date')

    def clean_birth_date(self):
        birth_date = self.cleaned_data['birth_date']
        age = (date.today() - birth_date).days // 365
        if age < 18:
            raise ValidationError("You must be at least 18 years old to register.")
        return birth_date

    def clean_phone_number(self):
        phone_number = self.cleaned_data['phone_number']
        if not re.match(r'^\+375 \d{2} \d{3} \d{2} \d{2}$', phone_number):
            raise ValidationError("Phone number must be in the format +375 -- --- -- --.")
        return phone_number

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_admin = True
        user.first_name = self.cleaned_data['first_name']  # Сохраняем имя
        user.last_name = self.cleaned_data['last_name']    # Сохраняем фамилию
        user.patronymic = self.cleaned_data['patronymic']  # Сохраняем отчество
        user.email = self.cleaned_data['email']  
        user.birth_date=self.cleaned_data['birth_date']
        user.phone_number=self.cleaned_data['phone_number']
        if commit:
            user.save()
            admin_profile = Admin.objects.create(
                user=user,
            )
        return user

    

class MedicationForm(forms.ModelForm):
    class Meta:
        model = Medication
        fields = '__all__'


class PharmacyDepartmentForm(forms.ModelForm):
    class Meta:
        model = PharmacyDepartment
        fields = '__all__'


class SupplierForm(forms.ModelForm):
    class Meta:
        model = Supplier
        fields = '__all__'


class MedicationSearchForm(forms.Form):
    query = forms.CharField(label='Search for medication')


class PurchaseForm(forms.ModelForm):
    pickup_point = forms.ModelChoiceField(queryset=PickupPoint.objects.all(), empty_label=None)

    class Meta:
        model = Purchase
        fields = ['quantity', 'pickup_point']


class FeedbackForm(forms.ModelForm):
    class Meta:
        model = FeedBack
        fields = ['note', 'text'] 
        widgets = {
            'note': forms.Select(choices=[(i, i) for i in range(1, 6)]),
            'text': forms.Textarea(attrs={'rows': 4}), 
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['note'].label = 'Rating'


class SliderSettingsForm(forms.ModelForm):
    class Meta:
        model = SliderSettings
        fields = ['delay', 'auto', 'loop', 'navs', 'pags', 'stopMouseHover']