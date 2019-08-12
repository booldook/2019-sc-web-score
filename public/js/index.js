var site = "https://webmir.co.kr/score";
var scoreURL = {
	cURL: site + "/score_in.php",
	rURL: site + "/score_li.php",
	uURL: site + "/score_up.php",
	dURL: site + "/score_del.php"
}

getList();
function getList() {
	$.ajax({
		type: "post",
		url: scoreURL.rURL,
		dataType: "json",
		success: function(res) {
			console.log(res);
		},
		error: function(xhr) {
			alert("통신이 실패했습니다. 관리자에게 문의하세요.");
			console.log(xhr);
		}
	});
}