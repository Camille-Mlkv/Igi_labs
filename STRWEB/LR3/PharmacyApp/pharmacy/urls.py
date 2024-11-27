from django.urls import path,include,re_path
from pharmacy.views import views,customers,pharmacy,admins,employees

urlpatterns = [
    path('',pharmacy.home,name='home'),
    path('contacts/', views.contacts, name='contacts'),
    path('contacts_table/', views.contacts_table, name='contacts_table'),
    path('about/', views.about, name='about'),
    path('policy/',views.policy,name='policy'),
    path('vacancies/',views.vacancies,name='vacancies'),
    path('index/',views.index,name='index'),
    path('questions/',views.questions,name='questions'),
    path('promocodes/',views.promocodes,name='promocodes'),
    path('news/',views.news,name='news'),
    path('news/<int:id>/', views.news_detail, name='news_detail'),
    path('feedbacks/',views.feedbacks,name='feedbacks'),
    path('age-checker/', views.age_checker, name='age_checker'),

    path('bank',views.bank_task,name='bank'),
    path('bank-functional',views.bank_functional,name='bank-functional'),
    path('bank-oop',views.bank_oop,name='bank-oop'),

    path('admin/home/', admins.AdminHome, name='admin_home'),

    path('add/medication', admins.add_medication, name='add_medication'),
    path('medications/', admins.view_medications, name='view_medications'),
    path('medications/<int:medication_id>/edit/', admins.edit_medication, name='edit_medication'),
    path('medications/<int:medication_id>/delete/', admins.delete_medication, name='delete_medication'),
    path('filter_medication',admins.filter_medications,name='filter_medications'),
    path('medication/<int:id>/', admins.medication_detail, name='medication_detail'),
    path('view_charts/', admins.view_charts, name='view_charts'),
    path('add/department', admins.add_department, name='add_department'),
    path('departments/', admins.view_departments, name='view_departments'),
    path('departments/<int:department_id>/edit/', admins.edit_department, name='edit_department'),

    path('add_supplier/', admins.add_supplier, name='add_supplier'),
    path('suppliers/', admins.view_suppliers, name='view_suppliers'),
    path('edit_supplier/<int:supplier_id>/edit/', admins.edit_supplier, name='edit_supplier'),

    path('search_medication/', admins.search_medication, name='search_medication'),

    path('view_sales/',admins.view_sales,name='view_sales'),

    path('view_employees/',admins.view_employees,name='view_employees'),

    path('set_banner_settings/',admins.slider_settings,name='set_banner_settings'),

    path('customer/home/', customers.CustomerHome, name='customer_home'),

    path('pickup_points/', customers.view_pickup_points, name='view_pickup_points'),
    path('catalog/', customers.view_catalog, name='view_catalog'),
    path('to_cart/<int:medication_id>/', customers.add_medication_to_cart, name='add_medication_to_cart'),
    path('customer/cart/', customers.view_my_cart, name='customer_cart'),
    path('pay/<int:item_id>/', customers.payment_page, name='payment_page'),
    path('complete_payment/<int:item_id>/', customers.complete_payment, name='complete_payment'),
    path('payment_success/', customers.payment_success, name='payment_success'),
    path('cart/update/<int:item_id>/<str:action>/', customers.update_cart_item_quantity, name='update_cart_item_quantity'),
    path('cart/remove/<int:item_id>/', customers.remove_from_cart, name='remove_from_cart'),
    path('buy_medication/<int:medication_id>/',customers.buy_medication,name='buy_medication'),
    path('customer/purchases/', customers.customer_purchases, name='customer_purchases'),
    path('leave_feedback/',customers.leave_feedback,name='leave_feedback'),
    path('get_age/',customers.get_age,name='get_age'),
    path('get_country/',customers.get_country,name='get_country'),

    path('employee/home',employees.EmployeeHome,name='employee_home'),
    path('admin/statistics',admins.view_statistics,name='view_statistics'),

    path('animation',views.animation,name='animation'),
    path('test_css',views.test_css,name='test_css'),

]

