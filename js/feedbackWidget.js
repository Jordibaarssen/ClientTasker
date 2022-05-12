class FeedbackWidget{
    constructor(elementId) {
        this._elementId = elementId;
    }

    get elementId() { //getter, set keyword voor setter methode
        return this._elementId;
    }

    show(message, type) {
        var x = document.getElementById(this._elementId);
        x.style.display = "block";
        $(x).text(message);
        if(type === "danger"){
            $(x).addClass('alert alert-danger');
            $(x).removeClass('alert alert-success')
        }else if(type === "success"){
            $(x).addClass('alert alert-success');
            $(x).removeClass('alert alert-danger')
        }

        var msg = {message : message, type : type};
        this.log(msg);

        console.log(this.history());
    }

    hide() {
        var x = document.getElementById(this._elementId);
        x.style.display = "none";
    }

    count = 1;
    log(message){
        {
            let lowestInt = this.count - 10;
            if(localStorage.length >= 10){
                localStorage.removeItem('feedback_widget'+ (lowestInt));
                console.log("boven de 10");
            }
            localStorage.setItem('feedback_widget'+ (this.count) , JSON.stringify(message));
            this.count++;
        }
    }

    removelog(){
        let lowestInt = this.count - 10;
        let i;
        for(i=lowestInt; i<this.count; i++){
            localStorage.removeItem('feedback_widget' +(i));
        }
        for(i=0; i<10; i++){
            localStorage.removeItem('feedback_widget' +(i));
        }
    }

    history() {

        let storage = [];
        let lowestInt = this.count - localStorage.length;
        let i;
        for (i = lowestInt; i < this.count; i++) {
            storage.push(JSON.parse(localStorage.getItem('feedback_widget' +(i))));
        }

        let stringbuild = "";
        for(i=0; i<storage.length;i++){
            stringbuild += storage[i].type + " - " + storage[i].message + "\n"
        }
        return stringbuild;
    }


}