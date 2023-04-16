import { Component } from '@angular/core';
import { Dialogue } from '../dialogue.service';
import { StoryBuilder } from '../storyBuilder.service';

@Component({
  selector: 'app-story',
  template: `
    <div *ngIf="currentDialogue">
      <p>{{ currentDialogue.message }}</p>
      <button *ngFor="let child of currentDialogue.children" (click)="selectChild(child)">{{ child.trigger }}</button>
      <button (click)="goBack()">Go back</button>
    </div>
  `
})
export class StoryComponent {
  storyBuilder: StoryBuilder;
  currentDialogue: Dialogue;

  constructor() {
    const rootDialogue = new Dialogue('Start');
    this.storyBuilder = new StoryBuilder(rootDialogue);

    this.storyBuilder
      .fromNode(rootDialogue)
        .addDialogue("Choice A")
          .addDialogue("Choice B")
            .endOfBranch()
        .addDialogue("Choice C")
          .endOfBranch()
        .addDialogue("Choice D")
          .addDialogue("Choice E")
            .addDialogue("Choice F")
              .endOfBranch()
            .endOfBranch()
          .addDialogue("Choice G")
            .endOfBranch()
          .addDialogue("Choice H")


    /*
      Start > A > B
            > C
            > D > E > F
                > G
                > H
    */


    this.currentDialogue = rootDialogue;
  }

  selectChild(child: Dialogue) {
    this.storyBuilder.selectChild(child);
    this.currentDialogue = child;
  }

  goBack() {
    this.storyBuilder.goBack();
    this.currentDialogue = this.storyBuilder.currentNode;
  }
}
