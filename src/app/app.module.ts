
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './loginUser/loginUser.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { BodyComponent } from './home/body/body.component';
import { AreaStartComponent } from './home/body/area-start/area-start.component';
import { AreaWelcomeComponent } from './home/body/area-welcome/area-welcome.component';
import { PopularProdComponent } from './home/body/popular-prod/popular-prod.component';
import { CartSlideComponent } from './home/cart-slide/cart-slide.component';
import { ShopComponent } from './shop/shop.component';
import { BodyShopComponent } from './shop/body-shop/body-shop.component';
import { AllProductsComponent } from './shop/body-shop/all-products/all-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BodyProductComponent } from './product-details/body-product/body-product.component';
import { CreateComponent } from './crudProduct/create/create.component';
import { CreateCartComponent } from './shoppingCart/create-cart/create-cart.component';
import { ConfirmOrderComponent } from './yourOrder/confirm-order/confirm-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetCartComponent } from './shoppingCart/get-cart/get-cart.component';
import { ControlAdminComponent } from './panelAdmin/control-admin/control-admin.component';
import { EditComponent } from './crudProduct/edit/edit.component';
const routes:Routes=[
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'cart', component: CartSlideComponent},
  { path: 'shop/:category', component: ShopComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'productDetails/:idProduct', component: ProductDetailsComponent },
  { path: 'create', component: CreateComponent },
  { path: 'home/:idClient', component: HomeComponent},
  { path: 'yourOrder/confirmOrder', component: ConfirmOrderComponent},
  { path: 'panelAdmin/controlAdmin', component: ControlAdminComponent},
  { path: 'crudProduct/edit', component: EditComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    AreaStartComponent,
    AreaWelcomeComponent,
    PopularProdComponent,
    CartSlideComponent,
    ShopComponent,
    BodyShopComponent,
    AllProductsComponent,
    ProductDetailsComponent,
    BodyProductComponent,
    CreateComponent,
    CreateCartComponent,
    ConfirmOrderComponent,
    GetCartComponent,
    ControlAdminComponent,
    EditComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
