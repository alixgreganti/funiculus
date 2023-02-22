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
    <div *ngIf="currentNode.children.length == 0">
      <p>No More Options</p>
    </div>
    <button *ngIf="currentNode !== root" (click)="goBack()">Go back</button>
  `,
})
export class AppComponent implements OnInit{


  root : Dialogue = new Dialogue("Hi, im shawty")
  // ADDING CHILDREN
  // You cannot add children outside of a function, so you can either make static responses and assign them later
  // or add the directly in ngOnInit, but its a tad harder to manage things that way
  // ie avoid doing root.children[0].children[0].addChild(new Dialogue("This Sucks", "Does this suck?"))
  bruh : Dialogue = new Dialogue("Fuck you hoe", "Excuse me?")
  chillin : Dialogue = new Dialogue("Yea I think you are cute", "Do you think im cute?")
  naw: Dialogue = new Dialogue("You should date me", "Im single")

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
