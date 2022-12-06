/* Test 1*/
describe("renders the Home page",() =>{
  it("renders correctly",()=>{
      cy.visit('/')
  })
})
 
/* Test 2*/
describe("check if the Landing Page has all the components",()=>{
  it("contains the right words for landing page",()=>{
    cy.contains('Welcome to VUse');
    cy.contains('Anchor Down!');
  })
})
 
/* Test 3*/
describe("checks to see if login button works on the Landing Page",()=>{
  it("clicking the Login Button",()=>{
    cy.get('[type=button]').click();
  })
})
 
/* Test 4*/
describe("renders the Login page",()=>{
  it("renders correctly",()=>{
    cy.visit('/#/login')
  })
})
 
/* Test 5*/
describe("(Not Logged in) Return back to the Landing Page after clicking the VUse button",()=>{
  beforeEach("Get on the Login Page",()=>{
    cy.visit('/#/login');
  })
  it("returns to landing page",()=>{
    cy.contains('VUse').click();
    cy.contains('Welcome to VUse');
    cy.contains('Anchor Down!');
  })
})
 
/* Test 6*/
describe("renders the Register page",()=>{
  it("renders correctly",()=>{
    cy.visit('/#/register')
  })
})
 
/* Test 7*/
describe("register a user with an email not Vanderbilt",()=>{
  const email = 'hello@email.com';
  beforeEach("Get on Register Page",()=>{
    cy.visit('/#/register');
  });
  it('entering user information',()=>{
    cy.get("input[type=email]").type(email);
    cy.contains('Must have a valid Vanderbilt Email');
  });
})
 
/* Test 8*/
describe("registering a User",()=>{
  const name = 'Akaash Seemakurty';
  const email = 'akaash.seemakurty@vanderbilt.edu';
  const pass = 'password123';
  beforeEach("Get on Register Page",()=>{
    cy.visit('/#/register');
    cy.get("input[type=name]").type(name);
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').eq(0).type(pass);
    cy.get('input[type=password]').eq(1).type(pass);
  });
 
  it('Register user', ()=>{
    cy.get('button[type=submit]').click();
  });
})
 
/* Test 9*/
describe('Logging in', ()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
 
  beforeEach(()=>{
    cy.visit('/#/login');
  });
  it('has a title', ()=>{
    cy.contains('Login');
  });
  it('signs in a new user', () =>{
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  })
})
 
/* Test 10*/
describe('Failed Login: Incorrect Email', ()=>{
  const email = 'invalidEmail@email.com';
  const pass = 'invalid_password';
 
  beforeEach(()=>{
    cy.visit('/#/login');
  });
 
  it('signs in a new user', () =>{
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click()
    cy.contains('Username and/or Password is incorrect');
  })
})
 
/* Test 11*/
describe('Clicking on a Product', ()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
 
  beforeEach(()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  });
  it('signs in a new user and checks out a product', () =>{
    cy.contains('Lorem ipsum').click();
  })
})
 
/* Test 12*/
describe('Returning back to the homepage for products after Clicking back button',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  beforeEach(()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
    cy.contains('Lorem ipsum').click();
  });
 
  it('clicking to check if you get to home page',()=>{
    cy.contains('V-Use').click();
    cy.contains('Featured Products');
  })
})
 
/* Test 13*/
describe('Logging in and Logging out',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name ='Akaash';
  it('Logging in and Out',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
    cy.contains(name).click();
    cy.contains('Logout').click();
    cy.contains('Welcome to VUse');
    cy.contains('Anchor Down!');
  });
})
 
/* Test 14*/
describe('Check to get to the Profile Page',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  });
  it('Go to the Profile Page',()=>{
    cy.contains(name).click();
    cy.contains('Profile').click();
    cy.contains('User Profile');
  })
})
 
/*Test 15*/
describe('Updating name via Profile',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  });
  beforeEach('Go to the Profile Page',()=>{
    cy.contains(name).click();
    cy.contains('Profile').click();
    cy.contains('User Profile');
  });
 
  it('Updating information', ()=>{
    cy.get('input[type = name]').type('Jeff').clear().type('Jeff');
    cy.get('button[type=submit]').eq(1).click();
    cy.contains('Jeff');
    cy.get('input[type = name]').type('Akaash').clear().type('Akaash');
    cy.get('button[type=submit]').eq(1).click();
    cy.contains('V-Use').click();
    cy.contains('Akaash');
  })
})
 
/*Test 16 */
describe('Entering incorrect confirm password via profile',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
    cy.contains(name).click();
    cy.contains('Profile').click();
    cy.contains('User Profile');
   
  });
  it('Updating the confirm password', ()=>{
    cy.get('input[type = password]').eq(0).type('hello4').clear().type('hello4');
    cy.get('input[type = password]').eq(1).type('hello').clear().type('hello');
    cy.get('button[type=submit]').eq(1).click();
    cy.contains('Passwords do not match')
  })
})
 
/*Test 17*/
describe('Check to see if my product page works',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  })
  it('Go to MyProductPage',()=>{
    cy.contains(name).click();
    cy.contains('My Products').click();
    cy.url().should('eq','http://localhost:8000/#/myproducts');
  })
})
 
/*Test 18*/
describe('Check to see if the CreateListing page works',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  })
  it('Go to Creating Listing',()=>{
    cy.contains(name).click();
    cy.contains('Create Listing').click();
    cy.contains('Normal Item').click();
  })
})

/*Test 18*/
describe('Checking if an item has no bidding functionality',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  })
  it('Verifying that the product is not ',()=>{
    cy.contains('Sample Name').click();
    cy.contains('');
  })
})

/*Test 19*/
describe('Access the Cart',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  })
  it('Access the Cart Page',()=>{
    cy.contains('Cart').click();
    cy.url().should('eq', 'http://localhost:8000/#/cart');
  })
  
})

/*Test 20 & 21*/
describe('Add to Cart',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  })
  it('Adding to cart and Removing from Cart',()=>{
    cy.contains('Sample Name').click();
    cy.get('[id=cartAdd]').click();
    cy.contains('Sample Name');
    cy.get('[id=remove]').click();
    cy.contains('Your cart is empty');
  })
})

/*Test 22*/
describe('Remove Item from MyProducts',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  })

  it('Removes from myProductPage',()=>{
    cy.contains(name).click();
    cy.contains('My Products').click();
    cy.get('[id=one]').eq(0).click();
    cy.get('Sample Product').should('not.exist');
  })
})

/*Test 23*/
describe('Accessing my OrderPage',()=> {
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  });
  it('Getting to my order page',()=>{
    cy.contains(name).click();
    cy.contains('My Orders').click();
    cy.url().should('eq', 'http://localhost:8000/#/orders');
  })
})

/*Test 24*/
describe('Updating password via Profile',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello3';
  const name = 'Akaash';
  beforeEach('Logging in',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
    cy.contains(name).click();
    cy.contains('Profile').click();
    cy.contains('User Profile');
    cy.get('input[type = password]').eq(0).type('hello4').clear().type('hello4');
    cy.get('input[type = password]').eq(1).type('hello4').clear().type('hello4');
    cy.get('button[type=submit]').eq(1).click();
  });
  it('Updating Password', ()=>{
    cy.contains(name).click();
    cy.contains('Logout').click();
    cy.contains('Welcome to VUse');
    cy.contains('Anchor Down!');
  })
})
 
describe('Checking if the Password is updated',()=>{
  const email = 'akaash@email.com';
  const pass = 'hello4';
  it('Updated Password',()=>{
    cy.visit('/#/login');
    cy.get("input[type=email]").type(email);
    cy.get('input[type=password]').type(pass);
    cy.get('button[type=submit]').click();
  })
})
