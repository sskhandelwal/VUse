from django.test import TestCase, Client
from django.urls import reverse
from base.models import Product

class ProductModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Product.objects.create(name='Test Product', email='test@email.com', 
        location='test location', description='test description', price=10)

    # teating that product data fields are properly labeled
    def test_name_label(self):
        product = Product.objects.get(_id=1)
        field_label = product._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')
    
    # testing that name field was properly populated
    def test_name(self):
        product = Product.objects.get(_id=1)
        name = product.name
        self.assertEqual(name, 'Test Product')

   # testing that email field was properly populated
    def test_email(self):
        product = Product.objects.get(_id=1)
        email = product.email
        self.assertEqual(email, 'test@email.com')

    # testing that location field was properly populated
    def test_location(self):
        product = Product.objects.get(_id=1)
        location = product.location
        self.assertEqual(location, 'test location')

    # testing that description field was properly populated
    def test_description(self):
        product = Product.objects.get(_id=1)
        description = product.description
        self.assertEqual(description, 'test description')

    # testing that price field was properly populated
    def test_price(self):
        product = Product.objects.get(_id=1)
        price = product.price
        self.assertEqual(price, 10)

    

# Create your tests here.
