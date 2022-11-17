from nturl2path import url2pathname
from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('users/register/', views.registerUser, name='register'),

    path('users/profile/', views.getUserProfile, name="users-profile"),
    path('users/profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('users/', views.getUsers, name="users"),

    path('products/', views.getProducts, name="products"),
    path('products/create/', views.createProduct, name="product-create"),
    path('products/upload/', views.uploadImage, name="image-upload"),
    path('products/<str:pk>/', views.getProduct, name="product"),
    path('products/update/<str:pk>/', views.updateProduct, name="product-update"),
    path('products/delete/<str:pk>/', views.deleteProduct, name="product-delete"),

]
