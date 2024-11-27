import json
from django.shortcuts import render,redirect,get_object_or_404
#from .models import Contact,Article,Vacancy,Question,PromoCode,News
# Create your views here.
from ..models import Contact,Article,Vacancy,Question,PromoCode,News,FeedBack,Employee,Partner,CompanyInfo,SliderSettings

def contacts(request):
    employees=Employee.objects.all()
    return render(request, 'contacts.html', {'employees': employees})

def contacts_table(request):
    employees=Employee.objects.all()
    return render(request, 'contacts_table.html', {'employees': employees})

def about(request):
    company = CompanyInfo.objects.first() 
    return render(request, 'about.html', {'company': company})

def policy(request):
    return render(request, 'policy.html')

def vacancies(request):
    vacancies=Vacancy.objects.all()
    return render(request,'vacancies.html',{'vacancies':vacancies})

def index(request):
    settings = SliderSettings.objects.first()
    if settings:
        slider_settings = {
            "auto": settings.auto,
            "delay": settings.delay,
            "loop": settings.loop,
            "navs": settings.navs,
            "pags": settings.pags,
            "stopMouseHover": settings.stopMouseHover,
        }
    else:
        slider_settings = {
            "auto": True,
            "delay": 5,
            "loop": True,
            "navs": True,
            "pags": True,
            "stopMouseHover": True,
        }
    latest_article = Article.objects.first()
    partners = Partner.objects.all()
    context = {
        'latest_article': latest_article,
        'partners':partners,
        'settings_json': json.dumps(slider_settings)
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


def animation(request):
    return render(request,'animation.html')


def test_css(request):
    return render(request,'test_css.html')

def age_checker(request):
    return render(request, 'age_checker.html')

def bank_task(request):
    return render(request, 'bank/bank.html')

def bank_functional(request):
    return render(request, 'bank/bank_functional.html')

def bank_oop(request):
    return render(request, 'bank/bank_oop.html')
