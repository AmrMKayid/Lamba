import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  itemsCount : number; // Total number of items
  limit : number; // Number of items per page
  curPage : number; // Number of the current page

  // TODO create item interface ?
  items :any[]; // Current items
  pages :any[]; // Holds the numbers of the pages available to be picked


  constructor(private StoreService : StoreService) {
    this.getItemCount();
    this.limit = 20 ;
    this.curPage = 1;
    this.loadItems();
    this.pages = [1,2,3,4,5];
  }

  ngOnInit() {
    $(document).ready(function() {
  var lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  let items = [{
      "name": "item",
      "img": "img/img1.jpg",
      "des": lorem + 0,
      "price": 21
    }, {
      "name": "item1",
      "img": "img/img2.jpg",
      "des": lorem + 1,
      "price": 28
    }, {
      "name": "item2",
      "img": "img/img3.jpg",
      "des": lorem + 2,
      "price": 2
    }, {
      "name": "item3",
      "img": "img/img4.jpg",
      "des": lorem + 3,
      "price": 7
    }, {
      "name": "item4",
      "img": "img/img5.jpg",
      "des": lorem + 4,
      "price": 18
    },
    {
      "name": "item5",
      "img": "img/img6.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item7",
      "img": "img/img7.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item8",
      "img": "img/img8.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item9",
      "img": "img/img9.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item10",
      "img": "img/img10.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item11",
      "img": "img/img11.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item12",
      "img": "img/img12.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item13",
      "img": "img/img13.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item14",
      "img": "img/img14.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item15",
      "img": "img/img15.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item16",
      "img": "img/img16.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item17",
      "img": "img/img17.jpg",
      "des": lorem + 5,
      "price": 12
    },
    {
      "name": "item18",
      "img": "img/img18.jpg",
      "des": lorem + 5,
      "price": 12
    }
  ];

  const itemStruct = function(itemName, itemPrice, itemDesc, itemImg, likes) {
    return "<div class='item'>" +
      // "<img src='" + itemImg + "'class='imgw100prec'>" +
      "<div class='itemBody'>" +
      "<h2 class='itemName'><b>" + itemName + "</b></h2>" +
      "<div class='itemLikeCount'>" + likes + " <span class='fa fa-heart'></span></div>" +
      "<div class='itemPrice'>Price: " + itemPrice + " LE</div>" +
      "<article class='itemDesc'>" + itemDesc + "</article>" +
      "<div class='itemUnLike'><i class='fa fa-heart'></i></div>" +
      "</div></div>";
  };

  for (let i = 0; i < items.length; i++) {
    let curItem = itemStruct(items[i].name, items[i].price, items[i].des, items[i].img, items[i].price);

    $(".block").append(curItem);
  }



});
  }

loadPage(){
  this.getItemCount();
}

  getItemCount(){
    this.StoreService.itemsCount().subscribe((data:any)=>{
      this.itemsCount = data.data;
      this.loadPageNumbers(1);
    });
  }

  loadPageNumbers(page:number){
    this.curPage = page;
    this.loadItems();
  }

  loadItems(){
      this.StoreService.viewItems(this.limit,this.curPage).subscribe((data:any)=>{
        this.items = data.data;
      });
  }


}
