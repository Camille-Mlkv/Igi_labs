from django.shortcuts import render,redirect,get_object_or_404
#from .models import Contact,Article,Vacancy,Question,PromoCode,News
# Create your views here.
from ..models import Contact,Article,Vacancy,Question,PromoCode,News,FeedBack,Employee,Partner,CompanyInfo

def contacts(request):
    employees=Employee.objects.all()
    return render(request, 'contacts.html', {'employees': employees})

def about(request):
    company = CompanyInfo.objects.first() 
    return render(request, 'about.html', {'company': company})

def policy(request):
    return render(request, 'policy.html')

def vacancies(request):
    vacancies=Vacancy.objects.all()
    return render(request,'vacancies.html',{'vacancies':vacancies})

def index(request):
    latest_article = Article.objects.first()
    partners = Partner.objects.all()
    context = {
        'latest_article': latest_article,
        'partners':partners
    }
    return render(request, 'index.html', context)

def questions(request):
    questions=Question.objects.all()
    return render(request,'questions.html',{'questions':questions})

def promocodes(request):
    active_promo_codes = PromoCode.objects.filter(is_active=True)
    archived_promo_codes = PromoCode.objects.filter(is_active=False)

    context = {
        'active_promo_codes': active_promo_codes,
        'archived_promo_codes': archived_promo_codes,
    }

    return render(request, 'promocodes.html', context)


def news(request):
    news = News.objects.all()
    return render(request, 'news.html', {'news': news})

def news_detail(request, id):
    news_item = get_object_or_404(News, id=id)
    return render(request, 'news_details.html', {'news': news_item})

def feedbacks(request):
    feedbacks=FeedBack.objects.all()
    return render(request,'feedbacks.html',{'feedbacks':feedbacks})