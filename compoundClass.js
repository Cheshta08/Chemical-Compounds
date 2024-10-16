class compound{
    constructor(cn,cd,imgurl,imgAtr,updateddate){
        this.CompoundName = cn;
        this.CompoundDescription= cd;
        this.strImageSource = imgurl;
        this.strImageAttribution =imgAtr;
        this.dateModified = updateddate;
    }
};

function formatDateToLocalString(date) {
    // Ensure the input is a Date object
    if (!(date instanceof Date)) {
       console.log(new Error('Input must be a Date object'));
       return new Date().toLocaleString();
    }

    // Get date components
    const day = String(date.getDate()).padStart(2, '0');   // Day (01-31)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month (01-12)
    const year = date.getFullYear();                         // Year (yyyy)
    
    // Get time components
    const hours = String(date.getHours()).padStart(2, '0');   // Hours (00-23)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes (00-59)

    // Create formatted date string
    return `${day}-${month}-${year} ${hours}.${minutes}'`;
}
module.exports = {
    formatDateToLocalString
}