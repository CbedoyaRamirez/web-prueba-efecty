import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataPersona } from "../interfaces/IDataPersona";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})

export class DataPersonService {
    private URL ="https://localhost:7142/api/"

    constructor(private httpServer: HttpClient) {

    }

    guardarInformacionDataPersona(data: DataPersona) {
        return this.httpServer.post<DataPersona>(`http://localhost:5034/api/DataPersona`, data)
    }

    consultarDataPersonas(): Observable<DataPersona[]> {
        return this.httpServer.get<DataPersona[]>("http://localhost:5034/api/DataPersona")
    }


}