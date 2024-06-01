function errDefault(res) {
  console.dir(res);
}

function ajaxInit(url, callback, errFunc = errDefault) {
  return function(reqJson) {
    //let ajax = ajaxInit1;
    //console.time(ajax);
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      /* readyState가 Done이고 응답 값이 200일 때, 받아온 response로 name과 age를 그려줌 */
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          //console.log(url, httpRequest.response);
          try {
            let json = JSON.parse(httpRequest.response);
            callback && callback(json);  
          } catch (e) {
            console.log(e);
            console.dir(httpRequest.response);
            errFunc && errFunc(httpRequest);
          }
          
        } else {
          errFunc && errFunc(httpRequest);
        }
        loading.style.display = "none";
      }
    }
    loading.style.display = "";
    /* Post 방식으로 요청 */
    httpRequest.open('POST', url, true);
    httpRequest.responseType = "text";
    /* 요청 Header에 컨텐츠 타입은 Json으로 사전 정의 */
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    /* 정의된 서버에 Json 형식의 요청 Data를 포함하여 요청을 전송 */
    httpRequest.send(JSON.stringify(reqJson));
  };
}
