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



const routes:Routes=[
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'cart', component: CartSlideComponent},
  { path: 'shop', component: ShopComponent },

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
