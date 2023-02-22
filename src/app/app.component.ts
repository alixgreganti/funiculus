import { Component, Input, OnInit } from '@angular/core';
import { Dialogue } from './dialogue.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ currentNode.message }}</h1>
    <div *ngIf="currentNode.children.length > 0">
      <ul>
        <li *ngFor="let child of currentNode.children">
          <button (click)="selectChild(child)">{{ child.trigger }}</button>
        </li>
      </ul>
    </div>
    <div *ngIf="currentNode === root">
      <p>End of conversation</p>
    </div>
    <button *ngIf="currentNode !== root" (click)="goBack()">Go back</button>
  `,
})
export class AppComponent implements OnInit{


  root : Dialogue = new Dialogue("Why do you hate cheese strings?")
  bruh : Dialogue = new Dialogue("Bruh")
  chillin : Dialogue = new Dialogue("Chilly AF")
  naw: Dialogue = new Dialogue("Bruh nooo")

  currentNode: Dialogue = this.root;

  ngOnInit() {
    this.bruh.addChild(this.chillin)
    this.bruh.addChild(this.naw)
    this.root.addChild(this.bruh)
  }

  selectChild(child: Dialogue) {
    this.currentNode = child;
  }

  goBack() {
    this.currentNode = this.currentNode.parent;
  }
}
