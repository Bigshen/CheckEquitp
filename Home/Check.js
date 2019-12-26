/**
 * html5调用摄像头扫码
 */
$(document).ready(function(){

    var ProjectRes = null,arrName = null,QA_PLAN_ID=null,QA_PLAN_LINE_ID=null,LOOKUP_CODE=null,USER_NAME = null,arrPlanId = null,arrPlanLineId = null,PlanId = {};




$('#CheckBtn').click(function () {
    alert("點擊了週期!!");
});
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //alert('是否是Android：'+isAndroid);
    //alert('是否是iOS：'+isiOS);
    if (isAndroid) {
        //如果是安卓手机，就弹框是选择图片还是拍照
        $(".tankuang").css("display", "block");
    } else {
        //如果是苹果系统，就还照之前的样子去操作即可
        //$($("#pictureA_file")[0]).click();
    }
//////////////////////////////
  /* $('#pictureC_file').change(function (e) {
        //$('#lefile').files;
        console.log(e);
        var fileDom = $('#pictureC_file').get(0);
        var img = $('#imageContent');
//				var fileMsg = e.currentTarget.files;
//			    var fileType = fileMsg[0].type;
//			    console.log(fileType);
        if (fileDom&&img) {
            fileHandle(fileDom,img);
        }
//			        var fr = new FileReader();
//			        fr.readAsDataURL(file);
//			        fr.onload = function(){
//			            $('#avatar-img').attr('src',fr.result)
//
//			        }
    })

    function fileHandle(fileDom,img) {
        //读取计算机文件
        //"multipart/form-data"
        var file = fileDom.files[0];
        var formData  =new FormData();
        formData.append('file',file);

//    	 var form = document.getElementById('uploadForm');
// 		var formData = new FormData(form);

            console.log(formData.get("file"));

       // console.log("文件数据"+formData);
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadstart = function(){

            // console.log(reader.result);
//    		 console.log(reader);

        };
        reader.onload = function(e){
            var result = reader.result;
            $.ajax({

                //http://192.168.60.45:8080/check2
                //http://10.64.154.235:8080/check2
                url:'http://192.168.60.31:8080/spc/SpcScan/QrCode.do',
                type:'POST',
                async : false,
                data:formData,
                processData:false,
                contentType:false,
                success:function(res){
                    //vaRetrun=res;
                   // alert(res);
                    ProjectRes = res;
                    console.log("設備ID"+ProjectRes);
                    ShowEmpList(res);

                    $("#showLabel").text(res);
                },
                error:function(err){
                    alert("NG:"+err);
                }
            })
            img.attr('src',reader.result);
        };
    }*/
////////////////

    var newfile = document.getElementById('pictureC_file');
    var getObjectURL = function (file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }


    newfile.onchange = function () {
        //   console.log(newfile[0]);
        console.log(getObjectURL(this.files[0]));// newfile[0]是通过input file上传的二维码图片文件
        qrcode.decode(getObjectURL(this.files[0]));
        qrcode.callback = function (res) {
            console.log("設備ID"+res);
            ProjectRes = res;
            ShowEmpList(res);
            $("#showLabel").text(res);
            //alert("二维码解析：" + res)
        }
    }
    /*$('#pictureC_file').change = function () {
        //   console.log(newfile[0]);
        console.log(getObjectURL(this.files[0]));// newfile[0]是通过input file上传的二维码图片文件
        qrcode.decode(getObjectURL(this.files[0]));
        qrcode.callback = function (imgMsg) {
            alert("二维码解析：" + imgMsg)
            ShowEmpList(imgMsg);
        }
    }
    var getObjectURL = function (file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }*/
    function ShowEmpList(res) {
        var command = 101;
        $.ajax({
            //http://10.64.154.235:8080/spchttp://10.64.154.235:8080/spc
            url:'http://192.168.60.45:8080/check2/get/getData',
            type:'POST',
            async : false,
            data:{command:command,nNUM:res},
            success:function(result){
                console.log(result);
                if (result.length> 0) {
                   //alert("查詢列表成功");
                   // console.log(result);
                    ShowSelectEmpListtTable(result);
                    ShowProjectList(11,res);
                } else {
                    alert("查询人員列表失败");
                }
            },
            error:function(err){
                alert("NG:"+err);
            }
        })
    }
function ShowSelectEmpListtTable(result) {
        console.log($(window).width());

        $('#empShowTable tbody').empty();
        //projectTable
       // $('#projectTable tbody').empty();
        for(var i=0;i<result.length;i++){
            LOOKUP_CODE = result[i]["LOOKUP_CODE"];
            var	tableContents='<tr>'+
                '<td class="touch" style="padding-top: 8px;padding-bottom: 0px;padding-left: 8px">'+result[i]["LOOKUP_CODE"]+'</td></tr>';
            //tableContents+="<tr><td></td></tr>";
            $('#empShowTable tbody').append(tableContents);

        }
    tableContents="<tr><td></td></tr>"+"<tr><td></td></tr>";
    $('#empShowTable tbody').append(tableContents);
   /* $("#empShowTable .touch").each(function () {
        $(this).css('height','30px');
    });*/
   // $(".touch").height(25);
        $(".touch").click(function(){
            USER_NAME = $(this).text();
            console.log("選擇點檢人員"+USER_NAME);
           //alert($(this).text());
        });
}
    function ShowProjectList(command,res){
        //var command = 101;
        $.ajax({
            url:'http://192.168.60.45:8080/check2/get/getData',
            type:'POST',
            async : false,
            data:{command:command,nNUM:res},
            success:function(result){
                console.log(result);
                if (result.length> 0) {
                    ShowSelectProListTable(result,command);//顯示點檢列表
                } else {
// $('#projectTable tbody').empty();
                   /* switch (command) {
                        case 11:  alert("無日點檢項目");
                            break;
                        case 12: alert("無週點檢項目");
                            break;
                        case 13: alert("無月點檢項目");
                            break;
                        case 14: alert("無季點檢項目");
                            break;
                        case 15: alert("無年點檢項目");
                            break;
                        default:
                            break;
                    }*/
                    switch (command) {
                        case 11:  $('#projectTable tbody').empty();
                            var  tableContents='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            $('#projectTable tbody').append(tableContents);
                                  $("#titlePresent").text("無設備ID資料,請Scan QRCode");
                            break;
                        case 12: $('#projectTable tbody').empty();
                            var  tableContents='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            $('#projectTable tbody').append(tableContents);
                                 $("#titlePresent").text("無設備ID資料,請Scan QRCode");
                            break;
                        case 13: $('#projectTable tbody').empty();
                            var  tableContents='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            $('#projectTable tbody').append(tableContents);
                                 $("#titlePresent").text("無設備ID資料,請Scan QRCode");
                            break;
                        case 14: $('#projectTable tbody').empty();
                            var  tableContents='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            $('#projectTable tbody').append(tableContents);
                                 $("#titlePresent").text("無設備ID資料,請Scan QRCode");
                            break;
                        case 15: $('#projectTable tbody').empty();
                            var  tableContents='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            tableContents+='<tr class="td" >' +
                                ' <td rowspan="2" style="width: 90px"> </td>'+
                                ' <td colspan="7" ></td> </tr>' +
                                '<tr>' +
                                '<td colspan="7"> </td> </tr>';
                            $('#projectTable tbody').append(tableContents);
                                 $("#titlePresent").text("無設備ID資料,請Scan QRCode");
                            break;
                        default:
                            break;
                    }
                }
            },
            error:function(err){
                alert("NG:"+err);
            }
        })
    }
function ShowSelectProListTable(result,command) {
    if($(window).width() > 768){
        //projectTable
        $('#projectTable tbody').empty();
        arrName = new Array(); //创建一个空数组
        arrPlanId = new Array();
        for(var i=0;i<result.length;i++){
            var  radioName = "selecte" + i;
            var inputNum = "inputNum" + i;
            var inputNot = "inputNot" + i;
            console.log("inputclass名"+inputNum+"input裡面的值"+$('.inputNum').val());
            switch (command) {
                case 11:  $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:日點檢]");
                    break;
                case 12: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:週點檢]");
                    break;
                case 13: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:月點檢]");
                    break;
                case 14: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:季點檢]");
                    break;
                case 15: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:年點檢]");
                    break;
                default:
                    break;
            }

            PlanId={QA_PLAN_ID:result[i]["QA_PLAN_ID"],
                QA_PLAN_LINE_ID:result[i]["QA_PLAN_LINE_ID"],
                RESOURCE_NAME:result[i]["RESOURCE_NAME"],
                RADIONAME:radioName,
                INPUTNUM:inputNum,
                INPUTNOT:inputNot
            };
             // $('.inputNot').val()
            console.log("name值"+radioName);
            var	tableContents='<tr class="td">'+
                '<td rowspan="2">'+result[i]["ITEM_NAME"]+'</td>'+
                '<td align="center" colspan="7" style="background-color: white">'+
                '<input type="radio" value="GG" style="width: 30px;height: 30px;" name='+radioName+'>'+
                '<input type="radio" value="MG" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+' >'+
                '<input type="radio" value="SR" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+' >'+
                '<input type="radio" value="RR" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+' >'+
                '<input type="radio" value="CC" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+' >'+
                '<input type="radio" value="SS" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+'>'+
                '<input type="radio" value="EL" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+'></td></tr>'+
                ' <tr><td colspan="7" style="background-color: white"><label style="background-color: #1E00A0;font-size: 17px">數值</label><input type="text" id='+inputNum+'  style="width: 100px;margin-left: 5px;border-radius: 5px;   "><label style="background-color: #1E00A0;margin-left: 5px;font-size: 17px">註記</label><input type="text"id='+inputNot+'   style="margin-left: 5px;border-radius: 5px;width: 400px"></td></tr>';
            $('#projectTable tbody').append(tableContents);
            //arrName.push(radioName);

            arrPlanId.push(PlanId);


        }
        console.log("數組"+arrName);
        var  tableContents='<tr class="td" >' +
            ' <td rowspan="2" style="width: 90px"> </td>'+
            ' <td colspan="7" ></td> </tr>' +
            '<tr>' +
            '<td colspan="7"> </td> </tr>';
        tableContents+='<tr class="td" >' +
            ' <td rowspan="2" style="width: 90px"> </td>'+
            ' <td colspan="7" ></td> </tr>' +
            '<tr>' +
            '<td colspan="7"> </td> </tr>';
        $('#projectTable tbody').append(tableContents);
    }else{
        alert("請切換至橫屏!!!");
    }

    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        if (window.orientation === 180 || window.orientation === 0) {

            //获取點檢人員div
            document.getElementById("CheckEmp").style.visibility="hidden";//隐藏

            //projectTable
            $('#projectTable tbody').empty();

             arrName = new Array(); //创建一个空数组arrPlanId = new Array();
            arrPlanId = new Array();
            arrPlanLineId = new Array();

            for(var i=0;i<result.length;i++){
                var  radioName = "selecte" + i;
                var inputNum = "inputNum" + i;
                var inputNot = "inputNot" + i;
                console.log("inputclass名"+inputNum+"input裡面的值"+$('.inputNum').val());
                switch (command) {
                    case 11:  $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:日點檢]");
                        break;
                    case 12: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:週點檢]");
                        break;
                    case 13: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:月點檢]");
                        break;
                    case 14: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:季點檢]");
                        break;
                    case 15: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:年點檢]");
                        break;
                    default:
                        break;
                }
                PlanId={QA_PLAN_ID:result[i]["QA_PLAN_ID"],
                    QA_PLAN_LINE_ID:result[i]["QA_PLAN_LINE_ID"],
                    RESOURCE_NAME:result[i]["RESOURCE_NAME"],
                    RADIONAME:radioName,
                    INPUTNUM:inputNum,
                    INPUTNOT:inputNot
                };
                console.log("name值"+radioName);
                var	tableContents='<tr class="td">'+
                    '<td rowspan="2" style="width: 106px">'+result[i]["ITEM_NAME"]+'</td>'+
                    '<td align="center" colspan="7" style="background-color: white;">'+
                    '<input type="radio" value="GG" style="width: 30px;height: 30px;" name='+radioName+'>'+
                    '<input type="radio" value="MG" style="width: 30px;height: 30px;margin-left: 70px" name='+radioName+' >'+
                    '<input type="radio" value="SR" style="width: 30px;height: 30px;margin-left: 70px" name='+radioName+' >'+
                    '<input type="radio" value="RR" style="width: 30px;height: 30px;margin-left: 70px" name='+radioName+' >'+
                    '<input type="radio" value="CC" style="width: 30px;height: 30px;margin-left: 70px" name='+radioName+' >'+
                    '<input type="radio" value="SS" style="width: 30px;height: 30px;margin-left: 70px" name='+radioName+' >'+
                    '<input type="radio" value="EL" style="width: 30px;height: 30px;margin-left: 70px" name='+radioName+'></td></tr>'+
                    ' <tr><td colspan="7" style="background-color: white"><label style="background-color: #1E00A0;font-size: 17px">數值</label><input type="text" id='+inputNum+'  style="width: 100px;margin-left: 5px;border-radius: 5px;caret-color:black;color: black;background-color: white;"><label style="background-color: #1E00A0;margin-left: 5px;font-size: 17px">註記</label><input type="text" id='+inputNot+'  style="margin-left: 5px;border-radius: 5px;width: 300px"></td></tr>';
                $('#projectTable tbody').append(tableContents);
               // arrName.push(radioName);

                arrPlanId.push(PlanId);

            }



            console.log("數組"+arrName);
            var  tableContents='<tr class="td" >' +
                ' <td rowspan="2" style="width: 90px"> </td>'+
                ' <td colspan="7" ></td> </tr>' +
                '<tr>' +
                '<td colspan="7"> </td> </tr>';
            tableContents+='<tr class="td" >' +
                ' <td rowspan="2" style="width: 90px"> </td>'+
                ' <td colspan="7" ></td> </tr>' +
                '<tr>' +
                '<td colspan="7"> </td> </tr>';
            $('#projectTable tbody').append(tableContents);

            // alert('竖屏状态！');
        }
        if (window.orientation === 90 || window.orientation === -90 ){
            document.getElementById("CheckEmp").style.visibility="visible";//显示
            //projectTable
            $('#projectTable tbody').empty();

            arrName = new Array(); //创建一个空数组
            arrPlanId = new Array();
            arrPlanLineId = new Array();
            for(var i=0;i<result.length;i++){
                var  radioName = "selecte" + i;
                var inputNum = "inputNum" + i;
                var inputNot = "inputNot" + i;
                console.log("inputclass名"+inputNum+"input裡面的值"+$('.inputNum').val());
                switch (command) {
                    case 11:  $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:日點檢]");
                        break;
                    case 12: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:週點檢]");
                        break;
                    case 13: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:月點檢]");
                        break;
                    case 14: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:季點檢]");
                        break;
                    case 15: $("#titlePresent").text(result[i]["RESOURCE_NAME"]+"[設備ID:"+ProjectRes+"]"+"[點檢週期:年點檢]");
                        break;
                    default:
                        break;
                }
                PlanId={QA_PLAN_ID:result[i]["QA_PLAN_ID"],
                    QA_PLAN_LINE_ID:result[i]["QA_PLAN_LINE_ID"],
                    RESOURCE_NAME:result[i]["RESOURCE_NAME"],
                    RADIONAME:radioName,
                    INPUTNUM:inputNum,
                    INPUTNOT:inputNot
                };
                console.log("name值"+radioName);
                var	tableContents='<tr class="td">'+
                    '<td rowspan="2">'+result[i]["ITEM_NAME"]+'</td>'+
                    '<td align="center" colspan="7" style="background-color: white">'+
                    '<input type="radio" value="GG" style="width: 30px;height: 30px;" name='+radioName+'>'+
                    '<input type="radio" value="MG" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+' >'+
                    '<input type="radio" value="SR" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+' >'+
                    '<input type="radio" value="RR" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+' >'+
                    '<input type="radio" value="CC" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+' >'+
                    '<input type="radio" value="SS" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+' >'+
                    '<input type="radio" value="EL" style="width: 30px;height: 30px;margin-left: 60px" name='+radioName+'></td></tr>'+
                    ' <tr><td colspan="7" style="background-color: white"><label style="background-color: #1E00A0;font-size: 17px">數值</label><input type="text" class='+inputNum+'  style="width: 100px;margin-left: 5px;border-radius: 5px;"><label style="background-color: #1E00A0;margin-left: 5px;font-size: 17px">註記</label><input type="text" id='+inputNot+' style="margin-left: 5px;border-radius: 5px;width: 400px"></td></tr>';
                $('#projectTable tbody').append(tableContents);
               // arrName.push(radioName);

                arrPlanId.push(PlanId);
            }

            console.log("數組"+arrName);
            var  tableContents='<tr class="td" >' +
                ' <td rowspan="2" style="width: 90px"> </td>'+
                ' <td colspan="7" ></td> </tr>' +
                '<tr>' +
                '<td colspan="7"> </td> </tr>';
            tableContents+='<tr class="td" >' +
                ' <td rowspan="2" style="width: 90px"> </td>'+
                ' <td colspan="7" ></td> </tr>' +
                '<tr>' +
                '<td colspan="7"> </td> </tr>';
            $('#projectTable tbody').append(tableContents);
        }
    }, false);
}
//獲取點擊週期
    $(".CheckTimes").click(function(){
        //alert($(this).text());
        //$("#insertIOCardMaIP").attr("style","display:none;");
        $('#insertIOCardMaIP').modal('hide');
       // document.getElementById("insertIOCardMaIP").style.visibility="hidden";//隐藏
        var command = null;
        switch ($(this).text()) {
            case "日點檢項目": command = 11;
                break;
            case "週點檢項目": command = 12;
                break;
            case "月點檢項目": command = 13;
                break;
            case "季點檢項目": command = 14;
                break;
            case "年點檢項目": command = 15;
                break;
            default:
                break;
        }
        if(command!=null&&ProjectRes!=null){
            ShowProjectList(command,ProjectRes);
        }

    });
    $('#submit').click(function () {


        //$("input[name='rd']:checked").val();

        console.log(arrPlanId);
        var arrResult = new Array();
       // var iCheckResult = null;
        if (arrPlanId==null){
            alert("點檢項目尚未勾選完or未選擇點檢員");
        }else{
            for (var i = 0; i < arrPlanId.length; i++) {
                // iCheckResult = USER_NAME +","+ProjectRes+","+arrPlanId[i]["QA_PLAN_ID"]+","+arrPlanId[i]["QA_PLAN_LINE_ID"]+","+$("input[name=" + arrPlanId[i]["RADIONAME"] + "]:checked").val();
                var obj = new Object();
                obj.QA_PLAN_ID = arrPlanId[i]["QA_PLAN_ID"];
                obj.QA_PLAN_LINE_ID = arrPlanId[i]["QA_PLAN_LINE_ID"];
                obj.CHECK_RESULT = $("input[name=" + arrPlanId[i]["RADIONAME"] + "]:checked").val();
                obj.RC_RESOURCE_ID = ProjectRes;
                obj.USER_NAME = USER_NAME;
                obj.CHECK_VALUE = $('#'+arrPlanId[i]["INPUTNOT"]).val();
                obj.CHECK_DESCRIPTION = $('#'+arrPlanId[i]["INPUTNUM"]).val();
                arrResult.push(obj);
                //console.log("選擇的value值" + $("input[name=" + radioName + "]:checked").val());
            }
           // console.log(arrResult);
        }

        /* 1：每个值用逗号分开，如果最后一位不是GG,MG,SR,RR,CC,SS,EL，用如下格式
    USER_NAME,RC_RESOURCE_ID,QA_PLAN_ID,QA_PLAN_LINE_ID,CHECK_RESULT,check_value,check_description
    2：如果最后一位是GG,MG,SR,RR,CC,SS,EL其中一个，用如下格式
    USER_NAME,RC_RESOURCE_ID,QA_PLAN_ID,QA_PLAN_LINE_ID,CHECK_RESULT
    比如
    (Yongguo.Li,63895,1889,4758,GG,1889,4759)用1
    (TFE_尹紅兵,73816,3486,9470,GG)用2*/
        var resultStatus = 0;
        //arrPlanId
        for (var i = 0; i < arrResult.length; i++) {
                if(arrResult[i]["CHECK_VALUE"]==null&&arrResult[i]["CHECK_DESCRIPTION"]==null){
                    if(arrResult[i]["USER_NAME"]==null||arrResult[i]["CHECK_RESULT"]==null) {
                        ++resultStatus;
                        if (resultStatus == arrResult.length) {
                            alert("點檢項目尚未勾選完or未選擇點檢員");
                        }
                    }else{
                        iCheckResult = arrResult[i]["USER_NAME"] +","+arrResult[i]["RC_RESOURCE_ID"]+","+arrResult[i]["QA_PLAN_ID"]+","+arrResult[i]["QA_PLAN_LINE_ID"]+","+arrResult[i]["CHECK_RESULT"];
                        console.log("上傳參數沒有數值"+iCheckResult);
                        $.ajax({
                            url:'http://192.168.60.45:8080/check2/get/submitData',
                            type:'POST',
                            async : false,
                            data:{iCheckResult:iCheckResult},
                            success:function(result){
                                console.log(result);
                                if (result == 1) {
                                    ++resultStatus;
                                    if (resultStatus ==arrResult.length){
                                        alert("提交成功");
                                    }
                                } else {
                                    alert("提交失敗");
                                }
                            },
                            error:function(err){
                                alert("NG:"+err);
                            }
                        })
                    }

                }else{
                    if(arrResult[i]["USER_NAME"]==null||arrResult[i]["CHECK_RESULT"]==null) {
                        ++resultStatus;
                        if (resultStatus == arrResult.length) {
                            alert("點檢項目尚未勾選完or未選擇點檢員");
                        }
                    }else{
                        iCheckResult = arrResult[i]["USER_NAME"] +","+arrResult[i]["RC_RESOURCE_ID"]+","+arrResult[i]["QA_PLAN_ID"]+","+arrResult[i]["QA_PLAN_LINE_ID"]+","+arrResult[i]["CHECK_RESULT"]+","+arrResult[i]["CHECK_VALUE"]+","+arrResult[i]["CHECK_DESCRIPTION"];
                        console.log("上傳參數有數值"+iCheckResult);
                        $.ajax({
                            url:'http://192.168.60.45:8080/check2/get/submitData',
                            type:'POST',
                            async : false,
                            data:{iCheckResult:iCheckResult},
                            success:function(result){
                                console.log(result);
                                if (result == 1) {
                                    ++resultStatus;
                                    if (resultStatus ==arrResult.length){
                                        alert("提交成功");
                                    }
                                } else {
                                    alert("提交失敗");
                                }
                            },
                            error:function(err){
                                alert("NG:"+err);
                            }
                        })
                    }

                }
           // }
        }
    });

})