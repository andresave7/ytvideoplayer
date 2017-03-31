export class Video {
    id:String
    title:String

    constructor (video:any){
       this.id = video.id; 
       this.title = video.title; 
    }

    getId():String{
        return this.id; 
    }
    setId(){

    }
    getTitle():String{
        return this.title;
    }
    setTitle(title:String){
        this.title = title;
    }
}