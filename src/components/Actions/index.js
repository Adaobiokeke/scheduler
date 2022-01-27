export const fetchData = (data)=>{
    const [firstItem, secondItem, thirdItem] = data;
    console.log(firstItem, secondItem, thirdItem)
    return{
        type:'FETCH_DATA',
        payload:{
            days: firstItem.data,
            appointments: secondItem.data,
            interviewers: thirdItem.data, 
        }

    }
}
