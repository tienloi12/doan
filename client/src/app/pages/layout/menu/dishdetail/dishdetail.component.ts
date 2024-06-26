import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DishState } from '../../../../ngrx/state/dish.state';
import { Subscription } from 'rxjs';
import { Dish } from '../../../../models/dish.model';
import * as DishActions from '../../../../ngrx/actions/dish.actions';
import { categoryState } from '../../../../ngrx/state/category.state';
import { Category } from '../../../../models/category.model';
import * as CategoryActions from '../../../../ngrx/actions/category.actions';
import { ShareModule } from '../../../../shared/shared.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import { get } from '../../../../ngrx/actions/location.actions';
import { DishService } from '../../../../service/dish/dish.service';
import { CartService } from '../../../../service/cart/cart.service';

@Component({
  selector: 'app-dishdetail',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './dishdetail.component.html',
  styleUrl: './dishdetail.component.scss'
})
export class DishdetailComponent implements OnDestroy {
  // properties
  dish$ = this.store.select('dish', 'dishList');
  category$ = this.store.select('category', 'categories');
  dishList: Dish[] = [];
  dishOrder: Dish = <Dish>{};
  categories: Category[] = [];
  subcriptions: Subscription[] = [];
  selectDish: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dishService: DishService,
    private cartService: CartService,
    private store: Store<{
      dish: DishState;
      category: categoryState;
    }>
  ) {
    //get dish and category 
    this.store.dispatch(DishActions.get({}));
    this.store.dispatch(CategoryActions.get());
    this.subcriptions.push(
      this.dish$.subscribe((dishList) => {
        if (dishList.length > 0) {
          console.log(dishList);
          this.dishList = dishList
        }
      }),
      this.category$.subscribe((categories) => {
        if (categories && categories.length > 0) {
          console.log(categories);
          this.categories = categories;
        }
      }),
    );
  }
  ngOnInit() {
    this.item = this.cartService.getItemDetail();
    this.store.dispatch(DishActions.get({}));
    this.store.dispatch(CategoryActions.get());

    this.subcriptions.push(
      this.dish$.subscribe((dishList) => {
        if (dishList.length > 0) {
          this.dishList = dishList;
        }
      }),
      this.category$.subscribe((categories) => {
        if (categories && categories.length > 0) {
          this.categories = categories;
        }
      }),
    );
    // const dishId = this.route.snapshot.paramMap.get('dId');
    // if (dishId) {
    //   this.dishService.getDishById(dishId).subscribe((dish: any) => {
    //     this.selectDish = dish;
    //   });
    // }
  }

  item = this.cartService.getItemDetail();

  ngOnDestroy(): void {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }
  // add to cart 
  addtoCart(dishCart: Dish): void {
    this.cartService.addToCart(dishCart);
    console.log(this.cartService.getSelectedDishes());
    this.router.navigate(['/base/order']);
  }
  // go back to menu
  goBack(): void {
    this.router.navigate(['/base/menu']);
  }
}
