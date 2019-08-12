var html = '';
var site = "https://webmir.co.kr/score";
var scoreURL = {
	cURL: site + "/score_in.php",
	rURL: site + "/score_li.php",
	uURL: site + "/score_up.php",
	dURL: site + "/score_del.php"
}

getList(6);
function getList(page) {
	$.ajax({
		type: "get",
		url: scoreURL.rURL,
		data: {
			page: page
		},
		dataType: "json",
		success: function(res) {
			console.log(res);
			for(var i in res.student) {
				html  = '<tr>';
				html += '<td>'+res.student[i].stdname+'</td>';
				html += '<td>'+res.student[i].kor+'점</td>';
				html += '<td>'+res.student[i].eng+'점</td>';
				html += '<td>'+res.student[i].math+'점</td>';
				html += '<td class="text-center">';
				html += '<button class="btn btn-success">수정</button> ';
				html += '<button class="btn btn-danger">삭제</button>';
				html += '</td>';
				html += '</tr>';
				$(".score-tb").find("tbody").append(html);
			}
			pagerMaker(res.total, page);
		},
		error: function(xhr) {
			alert("통신이 실패했습니다. 관리자에게 문의하세요.");
			console.log(xhr);
		}
	});
}

function pagerMaker(total, page) {
	var cnt = Math.ceil(total/10);
	html  = '<li class="page-item page-prev">';
	html += '<span class="page-link"><i class="fas fa-angle-double-left"></i></span>';
	html += '</li>';
	html += '<li class="page-item page-lt">';
	html += '<span class="page-link"><i class="fas fa-angle-left"></i></span>';
	html += '</li>';
	for(var i=1; i<=cnt; i++) {
		html += '<li class="page-item page-ct">';
		html += '<span class="page-link">'+i+'</span>';
		html += '</li>';
	}
	html += '<li class="page-item page-rt">';
	html += '<span class="page-link"><i class="fas fa-angle-right"></i></span>';
	html += '</li>';
	html += '<li class="page-item page-next">';
	html += '<span class="page-link"><i class="fas fa-angle-double-right"></i></span>';
	html += '</li>';
	$(".pager").html(html);
	if(page == 1) $(".page-lt").addClass("disabled");
	if(page == cnt) $(".page-rt").addClass("disabled");
	$(".page-ct").eq(page-1).addClass("active");
}