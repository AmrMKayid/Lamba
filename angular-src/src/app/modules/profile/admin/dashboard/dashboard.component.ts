import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public articles:Array<any>=[];

    constructor(
        private httpClient: HttpClient
    ) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'Learning is an Ocean',
                text:
                    'Develop passion for Learning'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'See the world through new eyes',
                text: 'Discover'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'An investment in knowledge pays the best interest',
                text:
                    'benjamin franklin'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
        let autorization =  { Authorization: localStorage.getItem('authentication') };
        this.httpClient.get('http://localhost:3000/api/user/viewUnverifiedArticles',{headers: autorization})
        .subscribe((res: any) => { this.articles = res.data;
         console.log( res.msg);
         console.log(res.data);
       }, err => {
         console.log( err.error.msg);
       });    
        
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
