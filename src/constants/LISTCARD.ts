export const GradColor = {
    gG: "#4CAF50", 
    gY: "#FFEB3B", 
    gB: "#2196F3", 
    gO: "#FF9800", 
    gR: "#F44336", 
};

export const TempGradient=[
    GradColor.gR,
    GradColor.gO,
    GradColor.gY,
    GradColor.gY,
    GradColor.gG,
    GradColor.gG,
    GradColor.gG,
    GradColor.gY,
    GradColor.gO,
    GradColor.gR,
    GradColor.gR,
]

export const HumGradient=[
    GradColor.gR,
    GradColor.gR,
    GradColor.gO,
    GradColor.gG,
    GradColor.gG,
    GradColor.gG,
    GradColor.gO,
    GradColor.gR,
]

export const PMGradient=[
    GradColor.gG,
    GradColor.gG,
    GradColor.gO,
    GradColor.gR,
    GradColor.gR,

]

export const PM25Gradient=[
    GradColor.gG,
    GradColor.gG,
    GradColor.gY,
    GradColor.gY,
    GradColor.gO,
    GradColor.gO,
    GradColor.gR,
    GradColor.gR,
]

export const TVOCDGradient=[
    GradColor.gG,
    GradColor.gG,
    GradColor.gO,
    GradColor.gO,
    GradColor.gR,
    GradColor.gR,
    GradColor.gR,
]   

export const eCO2Gradient=[
    GradColor.gG,
    GradColor.gG,
    GradColor.gO,
    GradColor.gR
]

export const AQIGradient=[
    GradColor.gG,
    GradColor.gG,
    GradColor.gG,
    GradColor.gO,
    GradColor.gO,
    GradColor.gR,
    GradColor.gR
]  


export const Description={
    TEMPERATURE:"Measures ambient air temperature in °C. Ideal temperature for sleep is typically between 18 to 22°C, affecting comfort and sleep quality",
    HUMIDITY:"Measures air moisture as a percentage. Ideal indoor humidity for comfort is between 30 to 50%, affecting breathing and skin hydration.",
    PM1:"Measures particulate matter ≤1.0 micrometers. High levels can enter deep lungs, causing respiratory issues and allergies.",
    PM25:"Measures particulate matter ≤2.5 micrometers. These fine particles can cause respiratory and cardiovascular problems when levels are high.",
    PM10:"Measures particulate matter ≤10 micrometers. Dust and pollen particles can irritate the lungs and exacerbate respiratory conditions.",
    TVOC:"Measures the concentration of harmful organic compounds in air. High levels can cause eye irritation, headaches, long-term health issues.",
    eCO2:"Estimates CO₂ levels in ppm based on other gases. High levels indicate poor ventilation, leading to drowsiness and discomfort.",
    AQI:"Rates overall air quality from 1 (Good) to 5 (Very Poor). Higher AQI levels can cause health issues, especially in sensitive individuals.",
}

export const sensorDataRange:{[key:string]:[number,number]}={
    "TEMPERATURE":[5,32],
    "HUMIDITY":[10,60],
    "PM1.0":[0,100],
    "PM2.5":[0,55],
    "PM10":[0,150],
    "TVOC":[0,1000],
    "eCO2":[0,2000],
    "AQI":[1,5],
}

export const Condition={
    "TEMPERATURE":[15,22,27,32],
    "HUMIDITY":[30,50,55,60],
    "PM1.0":[30,60,100],
    "PM2.5":[12,35,55],
    "PM10":[50,100,150],
    "TVOC":[220,600,1000],
    "eCO2":[800,1000,2000],
    "AQI":[2,3,4]
}