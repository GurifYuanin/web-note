var index=0;if(index>=$("#dataList a").length||index<0)alert("数组越界");else{var url=$("#dataList a")[index].href.substring($("#dataList a")[index].href.indexOf("/"));window.open(url)}for(var result=0,radio=$("#table1 input[type=radio]"),i=0;i<radio.length;i++)i%5===result&&radio.eq(i).attr("checked",!0);