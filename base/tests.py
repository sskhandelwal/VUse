from django.test import TestCase, Client
from django.urls import reverse
from base.models import Product

class ProductModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Product.objects.create(name='Test Product', email='test@email.com', 
        location='test location', description='test description', price=10)

    #**************************************************************************
    #                          TESTS ON MODELS
    #**************************************************************************

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

    #**************************************************************************
    #                          TESTS ON URLS
    #**************************************************************************

    #Tests to see if there is a Landing page(Pass)
    def test_testLandingPage(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code,200)

    #Tests to see if there is a home page
    def test_testHomePage(self):
        response = self.client.get('/#/home')
        self.assertEqual(response.status_code,200)

    #Tests to see if at least one product exists
    def test_testProductOnePage(self):
        response = self.client.get('/#/product/1')
        self.assertEqual(response.status_code,200)
    
    #Tests to see if the cartexists
    def test_testCart(self):
        response = self.client.get('/#/cart')
        self.assertEqual(response.status_code,200)

    #Tests to see if myProducts page exists
    def test_testMyProducts(self):
        response = self.client.get('/#/myproducts')
        self.assertEqual(response.status_code,200)
    
    #Tests to see if there is an order page
    def test_testOrders(self):
        response = self.client.get('/#/orders')
        self.assertEqual(response.status_code,200)

    #Tests to see if you are able to get to the create new listing page
    def test_testCreateNewListing(self):
        newListing = Product.objects.count() +1
        newListing_str = str(newListing)
        response = self.client.get('/#/product/'+newListing_str +'/edit')
        self.assertEqual(response.status_code,200)
    
    def test_testLogin(self):
        response = self.client.get('/#/login')
        self.assertEqual(response.status_code,200)

    def test_testProfile(self):
        response = self.client.get('/#/profile')
        self.assertEqual(response.status_code,200)

    def test_testRegister(self):
        response = self.client.get('/#/register?redirect=/home')
        self.assertEqual(response.status_code,200)

    #Tests to see if there are the product we are looking for exist
    #Should Fail
    def test_testTooMayProducts(self):
        product_size = Product.objects.count
        
        self.assertNotEqual(10,product_size)