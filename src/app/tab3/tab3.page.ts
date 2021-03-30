import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../foto.service';

export interface fileFoto{
  name:string; //filepath
  path:string; //web
}
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  urlImageStorage : string[] = [];
  urlTitleStorage : string[] = [];

  constructor(
    private afStorage:AngularFireStorage,
    public fotoService : FotoService
    
    
  ) {
    
   }

  async ngOnInit() {
    await this.fotoService.loadFoto();
    
  }
async ionViewDidEnter(){
  await this.fotoService.loadFoto();
  this.tampilkanData();
}

  

  tampilkanData(){
    this.urlImageStorage=[];
    this.urlTitleStorage=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    
    refImage.listAll()
    .then((res)=>{
      
      res.items.forEach((test)=>{
        
      })
      res.items.forEach((itemRef)=>{
        // itemRef.getMetadata().then(title =>{
        //   this.urlTitleStorage.unshift(title);
        // })
        
        
        itemRef.getDownloadURL().then(url =>{
          this.urlImageStorage.unshift(url);
          this.urlTitleStorage.unshift(itemRef.name) 
          
        })
        
      })

    }).catch((error) =>{
        console.log(error); 
    });
  }

  

}
