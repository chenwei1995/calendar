window.calendar;
calendar = {
  yearNum: null,  //年
  monthNum: null,  //月
  dayNum: null,  //日
  showCal: false,
  //补零
  toDou: function (n) {
    if (!n) return;
    return Number(n) < 10 ? '0' + n : '' + n;
  },
  //获得每月天数
  mGetDate: function (year, month) {
    var d = new Date(year, month+1, 0);
    return d.getDate();
  },
  //获取每月一号星期几
  getWeekDay: function (year, month) {
    var odatef = new Date();
    odatef.setFullYear(year,month,1);
    return odatef.getDay();
  },
  //总体渲染月日天
  createWrap: function (val) {
    var self = this;
    var wrap = '<div class="calendar-container"></div>';
    if (document.querySelector('.calendar-container')) return;
    document.body.innerHTML += wrap;
    var container = document.querySelector('.calendar-container');
    var operation = '<div class="operation-cal">'
        + '<div class="year-cal">'
          //年份选择盒子
          +'<div class="year-select">请选择</div><ul class="year-set" style="display: none;"></ul>'
        +'</div>'
        + '<div class="month-cal">'
            //月份选择盒子
            +'<div class="month-select">请选择</div><ul class="month-set" style="display: none;"></ul>'
        +'</div>'
        + '<div class="now-seted">返回今天</div>'
      +'</div>'
      + '<div class="date-cal-container">'
        +'<ul class="date-week"></ul>'
        +'<ul class="date-day"></ul>'
      +'</div>'
    container.innerHTML = operation;
    //渲染年月
    this.yearDraw();
    this.monthDraw();
    this.weekDraw();
    self.dateDraw();
    this.showTitle();
    this.showHideCal(val)
  },
  //年份渲染
  yearDraw: function () {
    var nowYear = new Date().getFullYear();
    var nowYear = nowYear - 15;
    var yearLi = document.querySelector('.year-set');
    var str = '';
    for (var i = 0; i < 100; i++) {
      nowYear++
      str += '<li>'+nowYear+'</li>'
    }
    yearLi.innerHTML = str;
  },
  //月份渲染
  monthDraw: function () {
    var mli = document.querySelector('.month-set');
    var str = '';
    for (var i = 0; i < 12; i++) {
      str += '<li>'+this.toDou(i+1)+'</li>'
    }
    mli.innerHTML = str;
  },
  //年份显示
  yearClick: function () {
    var el = document.querySelector('.year-set');
    var self = this;
    function year (e) {
      if (!(e.target.className.indexOf('year-select') > -1)) {
        el.style.display = 'none';
        return
      };
      if (e.target.className.indexOf('year-select') > -1) {
        self.showCal = true;
        if (el.style.display == 'none') {
          el.style.display = 'block';
        }
      }
    }
    document.removeEventListener('click', year, false);
    document.addEventListener('click', year, false);
  },
  //年份选择
  yearSelectEd: function () {
    var self = this;
    var yearSet = document.querySelector('.year-select');
    function getLiText(e) {
      if (e.target.tagName == 'HTML') return;
      if (e.target.parentElement.className.indexOf('year-set') > -1) {
        self.showCal = true;
        self.yearNum = e.target.innerHTML;
        yearSet.innerText = self.yearNum;
        self.dateDraw()
      }
    }
    document.removeEventListener('click', getLiText);
    document.addEventListener('click', getLiText);
  },
  //月份显示
  monthShow: function () {
    var el = document.querySelector('.month-set');
    var self = this;
    function month (e) {
      if (!(e.target.className.indexOf('month-select') > -1)) {
        el.style.display = 'none';
        return
      };
      if (e.target.className.indexOf('month-select') > -1) {
        self.showCal = true;
        if (el.style.display == 'none') {
          el.style.display = 'block';
        }
      }
    }
    document.removeEventListener('click', month);
    document.addEventListener('click', month);
  },
  //月份选择
  monthSelectEd: function () {
    var self = this;
    var monthSet = document.querySelector('.month-select');
    function getLiText(e) {
      if (e.target.tagName == 'HTML') return;
      if (e.target.parentElement.className.indexOf('month-set') > -1) {
        self.showCal = true;
        self.monthNum = e.target.innerHTML;
        monthSet.innerText = self.monthNum;
        self.dateDraw()
      }
    }
    document.removeEventListener('click', getLiText);
    document.addEventListener('click', getLiText);
  },
  //渲染周期
  weekDraw: function () {
    var weekControl = document.querySelector('.date-week');
    var str = '';
    var arr = ['一', '二', '三', '四', '五', '六', '日']
    for (var i = 0; i < 7; i++) {
      str += '<li>'+arr[i]+'</li>'
    }
    weekControl.innerHTML = str;
  },
  //渲染天数
  dateDraw: function () {
    var dateDayControl = document.querySelector('.date-day');
    if(!dateDayControl) return;
    var ow = dateDayControl.offsetWidth/7;
    var y, m; //y年份， m月份
    if (!this.yearNum) {
      y = new Date().getFullYear();
    }
    if (!this.monthNum) {
      m = new Date().getMonth();
    }
    if (this.yearNum) {
      y = this.yearNum;
    }
    if (this.monthNum) {
      m = Number(this.monthNum)-1;
    }
    var num = this.mGetDate(y, m);
    var date = this.getWeekDay(y, m);
    var str = '';
    if (date==0) {date=7};
    var activeNum = this.dayNum || new Date().getDate();
    var active = '';
    for (var i = 0; i < date-1; i++) {
      str += '<li style="width:'+ow+'px"></li>'
    }
    for (var i = 0; i < num; i++) {
      active = ''
      if (Number(activeNum) == Number(i+1)) {
        active = 'calActive'
      }
      str += '<li style="width:'+ow+'px;" class="item-day '+active+'">'+this.toDou(i+1)+'</li>'
    }
    dateDayControl.innerHTML = str;
  },
  //显示年月
  showTitle: function () {
    var yearControl = document.querySelector('.year-select');
    var monthControl = document.querySelector('.month-select');
    if (!yearControl) return;
    if (this.yearNum) {
      yearControl.innerText = this.yearNum;
    }
    if (this.monthNum) {
      monthControl.innerText = this.toDou(this.monthNum);
    }
    if (!this.yearNum) {
      yearControl.innerText = new Date().getFullYear();
    }
    if (!this.monthNum) {
      monthControl.innerText = this.toDou(new Date().getMonth()+1);
    }
  },
  //日期点击获取
  dateClick: function (fn) {
    var self = this;
    function getDates (e) {
      if (e.target.tagName == 'HTML') return;
      if (e.target.className.indexOf('item-day') > -1) {
        var itemDay = document.querySelectorAll('.item-day');
        for (var i = 0; i < itemDay.length; i++) {
          itemDay[i].className = 'item-day'
        }
        self.dayNum = e.target.innerHTML;
        e.target.className = 'item-day calActive';
        var datJson = {
          year: self.yearNum || new Date().getFullYear(),
          month: self.toDou(Number(self.monthNum)) || self.toDou(new Date().getMonth()+1),
          date: self.dayNum
        }

        fn && fn(datJson)
      }
    }
    document.removeEventListener('click', getDates);
    document.addEventListener('click', getDates);
  },
  //返回今日
  goDate: function () {
    var self = this;
    function goDates (e) {
      if (e.target.tagName == 'HTML') return;
      if (e.target.className.indexOf('now-seted') > -1) {
        self.yearNum = new Date().getFullYear();
        self.monthNum = new Date().getMonth()+1;
        self.dayNum = new Date().getDate();
        self.dateDraw()
        self.showTitle()
        self.showCal = true;
      }
    }
    document.removeEventListener('click', goDates);
    document.addEventListener('click', goDates);
  },
  //根据年月日渲染
  ymdDarw: function (ymd, name) {
    this.getCalendarHtml(name)
    this.showHideCal(true)
    this.yearNum = ymd.split('-')[0];
    this.monthNum = Number(ymd.split('-')[1]);
    this.dayNum = Number(ymd.split('-')[2]);
    this.dateDraw()
    this.showTitle()
  },
  //获得日历盒子内所有元素
  getCalendarHtml: function (name) {
    if(!name) return;
    var str = document.querySelector('.calendar-container');
    console.log(str);
    name.appendChild(str)
  },
  //点击空白部分隐藏日历
  dateShowHide: function () {
    var self = this;
    function showHide (e) {
      if (!document.querySelector('.calendar-container')) return;
      if (self.showCal) {
        self.showCal = self.showCal ? false : true;
        return
      }
      self.showHideCal(false)
    }
    document.removeEventListener('click', showHide, false);
    document.addEventListener('click', showHide, false);
  },
  //显示隐藏日历
  showHideCal: function (val) {
    this.showCal = val;
    if (document.querySelector('.calendar-container')) {
      if (this.showCal) {
        document.querySelector('.calendar-container').style.display = 'block';
      }
      if (!this.showCal) {
        document.querySelector('.calendar-container').style.display = 'none';
      }
    }
  },
  //初始化
  init: function (ops) {
    if (!ops.dateshow) ops.dateshow = false;
    this.createWrap(ops.dateshow)
    this.yearClick()
    this.yearSelectEd()
    this.monthShow()
    this.monthSelectEd()
    this.goDate()
    if (!ops.dateshow) {
      this.dateShowHide()
    }
    this.dateClick(ops.ymd)
  }
}
