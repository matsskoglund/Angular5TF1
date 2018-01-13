import { Component, Input, Inject  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    // to get the Student Details   
    public ToolsInventory: InventoryMaster[] = [];
    AddTable: Boolean = false;  
    public sToolID: number = 0;
    public sAquire = "";
    public sCategoryID: number = 0;
    public sDescription = "";
    public sName = "";
    public sUrlRef = "";
    public bseUrl: string = ""; 
    myName: string;
    constructor(public http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myName = "Mats"; 
        this.bseUrl = "http://localhost:5000/";
        this.getData();
    }
    //to get all the ToolsInventory data from Web API   
    getData() {

        this.http.get(this.bseUrl + 'api/tools').subscribe(result => {
            this.ToolsInventory = result.json();
        }, error => console.error(error));        
    }
    AddTool() {
        this.AddTable = true;  
        this.sToolID = 0;
        this.sAquire = "";
        this.sCategoryID = 1;
        this.sDescription = "";
        this.sName = "";
        this.sUrlRef = "";
    }

    deleteTool(toolIDs: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        this.http.delete(this.bseUrl + 'api/tools/' + toolIDs, { headers: headers }).subscribe(response => {
            this.getData();

        }, error => {
        }
        );

        //this.http.get(this.bseUrl + 'api/InventoryMasterAPI/Inventory').subscribe(result => {   
        //    this.Inventory = result.json();   
        //}, error => console.error(error));    
    }   

    editToolDetails(toolID: number, toolName: string, categoryID: number, description: string, aquire: string, urlRef: string) {
        this.AddTable = true;
        this.sToolID = toolID;
        this.sAquire = aquire;
        this.sCategoryID = categoryID;
        this.sDescription = description;
        this.sName = toolName;
        this.sUrlRef = urlRef;
    }


    // ToolID.value,ToolName.value,CategoryID.value,Description.value,Aquire.value,UrlRef.value
    addToolDetails(toolID: number, toolName: string, categoryID: number, description: string, aquire: string, urlRef: string ) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        if (toolID == 0) {
            this.http.post(this.bseUrl + 'api/tools/', JSON.stringify({ ToolID: toolID, Name: toolName, URLRef: urlRef, Description: description, Aquire: aquire, CategoryID: categoryID}),
                { headers: headers }).subscribe(
                response => {
                    this.getData();

                }, error => {
                }
                );

        }
        else {
            this.http.put(this.bseUrl + 'api/tools/' + toolID, JSON.stringify({ ToolID: toolID, Name: toolName, URLRef: urlRef, Description: description, Aquire: aquire, CategoryID: categoryID }), { headers: headers })
                .subscribe(response => {
                    this.getData();

                }, error => {
                }
                );

        }
        this.AddTable = false;
        //   
        //   
        //this.http.get(this.bseUrl + 'api/InventoryMasterAPI/ToolsInventory').subscribe(result => {   
        //    this.ToolsInventory = result.json();   
        //}, error => console.error(error));    
    }   
}
export interface InventoryMaster {
    toolID: number;
    aquire: string;
    categoryID: number;
    description: string;
    name: string;
    urlRef: string;    
}  