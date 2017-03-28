function Lemon() {
	this.grammar = tracery.createGrammar({
		"origin": ["#[selObject:#object#]story#"],
		"story": ["이봐, 친구! 그거 알아?<br />#selObject# 한 개엔 자그마치 #selObject# 한 개 분량의 #content# 있다는 놀라운 사실을!"],
		"object": ["레몬","자파리 만쥬","전투식량","네 월급봉투","사과상자","사과","빵","인간","퇴직금","라면"],
		"content": ["비타민 C가","타노시↗가","드래곤볼이","세금이","미소녀가","미소년이","레몬이","설탕이","사과가","희망이","추억이","밀가루가"]
	});
	
	this.isFirstGen = true;
}

Lemon.prototype.GenerateText = function()
{
	return this.grammar.flatten("#origin#");
}

Lemon.prototype.SetText = function(txt)
{
	$("#text").html(txt);
}

Lemon.prototype.RefreshText = function()
{
	var txt = "";
	// 최초 생성시에는 기본 문장, 이후부터는 랜덤문장 생성
	if (this.isFirstGen)
	{
		tracery.setRng(function() { return 0; });
		
		txt = this.GenerateText();
		
		tracery.setRng(Math.random);
		this.isFirstGen = false;
	}
	else
	{
		txt = this.GenerateText();
	}
	
	this.SetText(txt);
}

Lemon.prototype.InitDocument = function()
{
	var lemonThis = this;
	
	$(document).ready(function() {
		$('#refresh').click(function() {
			lemonThis.RefreshText();
		});
	})
}

var lemon = new Lemon();
lemon.InitDocument();
lemon.RefreshText();