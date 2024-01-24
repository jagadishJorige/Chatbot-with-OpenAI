import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faDragon, faRobot, faPaperPlane, faUser, faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { map, delay } from 'rxjs';

@Component({
  selector: 'app-assistant',
  standalone: false,
  templateUrl: './assistant.component.html',
  styleUrl: './assistant.component.scss'
})
export class AssistantComponent implements OnInit{
  visible: boolean = false;
  orgKey: string = '**********';
  authKey: string = '******************';
  chatUrl: string = 'https://api.openai.com/v1/chat/completions';
  messages: any[] = [];
  initAssistant: any;
  serverUrl: string = 'http://localhost:5000/api/';

  inputMessage: string = '';

  bot = {
    role: 'assistant',
    date: new Date(),
    content: ''
  };

  user = {
    role: 'user',
    date: new Date(),
    content: ''
  };

  suggestions: any[] = [
    { 'content': 'Implementation of ESI Scheme (LAW)' },
    { 'content': 'Implementation of ESI Scheme (Procedure)' },
    { 'content': 'ESI Scheme (LAW) - Court Judgements' },
    { 'content': 'ESI Scheme (Procedure) - Survey' },
    { 'content': 'ESI Scheme (Procedure) - Medical Arrangements' },
  ];

  showloader: boolean = false;

  dum: any = 
  "Sure, I can help you design a database schema for an online merchandise store. Here's a suggestion:\n\n1. Users table:\n   - user_id (primary key)\n   - username\n   - email\n   - password\n   - address\n   \n2. Products table:\n   - product_id (primary key)\n   - name\n   - description\n   - price\n   - quantity\n   \n3. Categories table:\n   - category_id (primary key)\n   - name\n   \n4. Product_Categories table:\n   - product_id (foreign key referencing Products table)\n   - category_id (foreign key referencing Categories table)\n\n5. Orders table:\n   - order_id (primary key)\n   - user_id (foreign key referencing Users table)\n   - order_date\n   - total_amount\n   \n6. Order_Items table:\n   - order_item_id (primary key)\n   - order_id (foreign key referencing Orders table)\n   - product_id (foreign key referencing Products table)\n   - quantity\n   - price\n   \n7. Cart table:\n   - cart_id (primary key)\n   - user_id (foreign key referencing Users table)\n   \n8. Cart_Items table:\n   - cart_item_id (primary key)\n   - cart_id (foreign key referencing Cart table)\n   - product_id (foreign key referencing Products table)\n   - quantity\n   - price\n   \nThis schema allows you to store information about users, products, categories, orders, and the shopping cart. The relationships between the tables are also included, such as the association between products and categories, and the association between cart items and users.\n\nPlease note that depending on the specific requirements of your online merchandise store, the schema may need some adjustments or additional tables/columns to cater to your unique needs."



  constructor(private http: HttpClient, library: FaIconLibrary) {
    library.addIcons(
      faDragon,
      faRobot,
      faPaperPlane,
      faUser,
      faAnglesUp
    );
  }

  ngOnInit(): void {
    let obj = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Hello!"
            }
        ]
    }
    
    this.initiateAI(obj);
  }

  showDialog() {
    this.visible = true;
  }

  initiateAI=(payload: any)=> {
    const httpHeaders = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', `Bearer ${this.authKey}`);

    this.http.get(this.serverUrl + 'initiate', {headers: httpHeaders}).subscribe((res: any)=> {
      if(res && res['bot'] && res['bot'].length) {
        const response = res['bot'][0];
        const { message } = response;
        this.initAssistant = { ...this.bot, ...message };
      } 
    })
  }

  // Method in component class
  // trackByFn(index: any, item: any) {
  //   return item.id;
  // }

  selectSuggestion(val: string) {
    const obj = { 'content': val, date: new Date() };
    this.messages.push({ ...this.user, ...obj });
    this.sendReq(val);
  } 

  sendReq=(content: string)=> {
    const httpHeaders = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', `Bearer ${this.authKey}`);
    const body = JSON.stringify({
      prompt: content
    });
    this.showloader = true;
    // .pipe(delay(1000))
    this.http.post(this.serverUrl + 'message', body, {headers: httpHeaders}).subscribe((res: any)=> {
      this.showloader = false;
      if(res && res['bot'] && res['bot'].length) {
        const response = res['bot'][0];
        const { message } = response;
        const concatObj = { ...this.bot, ...message };
        this.messages.push(concatObj);
        console.log(this.messages,"messages");
      }
    });
  }

  sendMessage=()=> {
    const val = this.inputMessage;
    const obj = { 'content': val, date: new Date() };
    this.messages.push({ ...this.user, ...obj });
    setTimeout(()=> {
      this.inputMessage = '';
    },1000);
    this.sendReq(val);
  }


  createAssistant=()=> {
    const httpHeaders = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', `Bearer ${this.authKey}`);

    this.http.post(this.serverUrl + 'createassistant', {},{headers: httpHeaders}).subscribe((res: any)=> {
      console.log(res, "ASSISTANT");

    })
  }
}
