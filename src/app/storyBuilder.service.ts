/*
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


      Start > A > B
            > C
            > D > E > F
                > G
                > H

*/
import { Dialogue } from './dialogue.service';

export class StoryBuilder {
  public currentNode: Dialogue;
  private root: Dialogue;

  constructor(root: Dialogue) {
    this.currentNode = root;
    this.root = root;
  }

  openBook(){
    this.currentNode = this.root;
    return this;
  }

  fromNode(node: Dialogue): StoryBuilder {
    this.currentNode = node;
    return this;
  }

  addDialogue(message: String, trigger: String = message, tag: String = ''): StoryBuilder {
    // Expand the Branch, and enter
    const dialogue = new Dialogue(message, trigger, tag);
    this.currentNode.addChild(dialogue);
    this.currentNode = dialogue;
    return this;
  }

  //addSibling
  branchDialogue(message: String, trigger: String = message, tag: String = ''): StoryBuilder {
    // Expand the Branch
    const dialogue = new Dialogue(message, trigger, tag);
    this.currentNode.parent.addChild(dialogue);
    return this;
  }

  visitParent(): StoryBuilder {
    // Expand the Branch
    this.currentNode = this.currentNode.parent;
    return this;
  }

  branchDialoguebyTag(targetTag: string, message: string, trigger: string = message, childTag: string = ''): StoryBuilder {
    const node = this.getNodeByTag(targetTag);
    if (node) {
      const newDialogue = new Dialogue(message, trigger);
      if (childTag) {
        newDialogue.tag = childTag;
      }
      node.addChild(newDialogue);
    }
    return this;
  }
  

    endOfBranch(): StoryBuilder {
      this.currentNode = this.currentNode.parent;
      return this;
    }

    getNodeByTag(tag: String): Dialogue | null {
      return this.root.getDescendantByTag(tag);
    }
  
    build(): Dialogue {
      return this.currentNode;
    }

    selectChild(child: Dialogue) {
      this.currentNode = child;
      child.read();
    }
  
    goBack() {
      if (this.currentNode !== this.root) {
        this.currentNode = this.currentNode.parent;
      }
    }
  }
  