//Calculate the Best , Average, Marginal, Worst constion of sensor Data
import { Condition } from "@/constants/LISTCARD";
export const condition =({name,value}:{name:string,value:number}) :string=>{
    const data = Condition[name as keyof typeof Condition];
    if(name==="TEMPERATURE" || name==="HUMIDITY"){
        if(value<data[0] ||value>data[3]) return "(Bad)";
        else if(value<=data[1]) return "(Best)";
        else if(value<=data[2]) return "(Marginal)";
    }
    else{
        if(value<=data[0]) return "(Best)";
        else if(value<=data[1]) return "(Average)";
        else if(value<data[2]) return "(Marginal)";
        return "(Bad)";
    }
    return "(No Valid Condition)"
}

export const AQICondition =({value}:{value:number}) :string=>{
    if(value==1) return "(Best)";
    else if(value==2) return "(Good)";
    else if(value<=4) return "(Marginal)";
    return "(Bad)";
}