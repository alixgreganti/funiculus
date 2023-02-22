//So, this is essentially just a double linked list
export class Dialogue{
    parent: Dialogue = this; // Start of conversation will not have a parent, will just loop back on itself.
    children: Array<Dialogue> = []; // Dialogue can have multiple different children
    
    message: String; // What this Dialogue will say ie: "Your phone number is xxx-xxx-xxxx"
    trigger: String; // When creating Dialogue, this will be the Dialogue is "asked" by the user, ie "What is my phone number?"

    constructor(message: String, trigger: String = message){ // All Dialogue MUST have something to say
        this.message = message
        this.trigger = trigger // Defaults to be the same as the message if not set
    }

    speak(){ // Outputs the Dialogue in console
        console.log(this.message)
    }

    setParent(parent: Dialogue){ // Changes the parent if needed
        this.parent = parent;
    }

    addChild(child: Dialogue){ // When a child is added, we change the parent of that child to this object
        child.setParent(this)
        this.children.push(child);
    }

    viewChildren(){ // Goes through and lists all the children
        for(const child in this.children){
            console.log(this.children[child].message)
        }
    }

    hasChildren(){ // Let's us know if a dialouge is childless or not
        if(this.children.length > 0){
            return true
        } else {
            return false
        }
    }

    // These two functions were from ChatGPT because im lazy
    getAncestorByTrigger(trigger: String): Dialogue | null { // Looks at the above parents and tries to find a match
        if (this.trigger === trigger) {
            return this;
        } else if (this.parent === this) {
            return null;
        } else {
            return this.parent.getAncestorByTrigger(trigger);
        }
    }

    getChildByTrigger(trigger: String): Dialogue | null { // Looks only at the direct children, going through the ENTIRE dialouge could be exausting for JS 
        for (const child of this.children) {
            if (child.trigger === trigger) {
                return child;
            }
        }
        return null;
    }
}

/*
Sample Scenario
---------------
Output: "How can I help?"
Options: "Whats my phone number?", "How old is my cat?", "What do you like?" <- these are the parents childrens prompts
-> Selects "Whats my phone number?" <- Choose Prompt
Output: "Your phone number is xxx-xxx-xxxx"
Options: "Thank you, that will be all" <- closes the chat, "Am I pretty?" <- continues dialouge
*/
