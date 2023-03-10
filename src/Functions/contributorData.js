export function Convert(data,type){
 
  const dates=data[0].weeks.map(item=>{
    const fullDate = new Date(item.w * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .replace("00:00:00", "");
  return fullDate;
  })
  const commitseries=data.map(item=>{
    let obj={name:item.author.login}
    const commit=item.weeks.map(item=>item[type])
    obj.data=[...commit]
    return obj
  })
  const option = {
    title:{
      text:"Contributors Graph"
    },
    xAxis: {
      categories: dates
    },
    series: commitseries
  };
  return option
 
}

export function AuthorCommit(data,author){
 
  const dates=data.map(item=>{
    const fullDate = new Date(item.week * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .replace("00:00:00", "");
  return fullDate;
  })
  const commitData=data.map(item=>item.total)
  const option = {
    title:{
      text:`${author} commit graph`
    },
    xAxis: {
      categories: dates
    },
    series: [
    {
      name:author,
      data:commitData
    }
  ]
  };
  return option
}


export function AuthorActivity(data,author,type){
  if(data.length===undefined){
    return "No Data"
  }
  else{
    let num;
    type==='a'?num=1:num=2;
    const dates=data.map(item=>{
      const fullDate = new Date(item[0] * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")
      .replace("00:00:00", "");
    return fullDate;
    })
    const weeklyData=data.map(item=>item[num]);
    const option = {
      title:{
        text:`${author} activity graph`
      },
      xAxis: {
        categories: dates
      },
      series: [
      {
        name:author,
        data:weeklyData
      }
    ]
    }
    return option
  }
  
}