export class TextDiff {
  // Difference markup (at word granularity)
  diff2(a: string, b: string) {
    //
    let a_arr = a.split(' ');
    let b_arr = b.split(' ');
    let res_arr: any = [];
    let res : string = '';
    let sep : string = '';
    res_arr = this.diff_aux(res_arr, a_arr, b_arr);
    //<span class="diffwow-add">wow</span>
    for(let r of res_arr) {
      if (r.markup === '') {
        res += sep + r.text;
      }
      else {
        res += sep + '<span class="diffwow-' + r.markup + '">' + r.text + '</span>';
      }
      sep = ' ';
    }
    return res;
  }

  diff_aux (r, a, b) {
    if (a.length >= 1 && b.length == 0) {
      r.push({text:a[0], markup:"remove"});
      a = a.slice(1);
      return this.diff_aux(r, a, b);
    }
    if (a.length == 0 && b.length >= 1 ) {
      r.push({text:b[0], markup:"add"});
      b = b.slice(1);
      return this.diff_aux(r, a, b);
    }
    if (a.length == 0 && b.length == 0 ) {
      return r;
    }
    if (a[0] == b[0]) {
      r.push({text:a[0], markup:""});
      a = a.slice(1);
      b = b.slice(1);
      return this.diff_aux(r, a, b);
    }
    else {
      let b_in_a = this.is_found_in(b[0], a);
      let a_in_b = this.is_found_in(a[0], b);
      //console.log(a[0], a_in_b, b[0], b_in_a);
      if (b_in_a > a_in_b) {
        if (a_in_b) {
          r.push({text:b[0], markup:"add"});
          b = b.slice(1);
          //a = a.slice(1);
          return this.diff_aux(r, a, b);
        }
        else {
          r.push({text:a[0], markup:"remove"});
          a = a.slice(1);
          return this.diff_aux(r, a, b);
        }
      }
      else {
//        if(a_in_b === b_in_a){
//          r.push({text:a[0], markup:"remove"});
//          r.push({text:b[0], markup:"add"});
//          a = a.slice(1);
//          b = b.slice(1);
//          return this.diff_aux(r, a, b);
//        }
//        else 
        if(b_in_a) {
          r.push({text:a[0], markup:"remove"});
          a = a.slice(1);
          return this.diff_aux(r, a, b);
        }
        else {
          r.push({text:b[0], markup:"add"});
          b = b.slice(1);
          return this.diff_aux(r, a, b);
        }
      }
    }
  }

  is_found_in(a: string, b_arr, stop_distance:number = 8): number {
    let dist = 0;
    for(let b of b_arr) {
      stop_distance -= 1;
      if (stop_distance === 0) {
        return 0;
      }
      if (a == b) {
        return dist;
      }
      dist += 1;
    }
    return 0;
  }

  diffString( o, n ) {
    o = o.replace(/\s+$/, '');
    n = n.replace(/\s+$/, '');

    let out = this.diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
    let str = "";

    let oSpace = o.match(/\s+/g);
    if (oSpace == null) {
      oSpace = ["\n"];
    } else {
      oSpace.push("\n");
    }
    let nSpace = n.match(/\s+/g);
    if (nSpace == null) {
      nSpace = ["\n"];
    } else {
      nSpace.push("\n");
    }

    if (out.n.length == 0) {
        for (let i = 0; i < out.o.length; i++) {
          str += '<span class="remove">' + this.escape(out.o[i]) + "</span>" + oSpace[i];
        }
    } else {
      if (out.n[0].text == null) {
        for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
          str += '<span class="remove">' + this.escape(out.o[n]) + "</span>" + oSpace[n];
        }
      }

      for ( let i = 0; i < out.n.length; i++ ) {
        let o_n = out.n[i];
        let text = (typeof o_n === 'string')? o_n: o_n.text;
        if (o_n.text == null || o_n.row > i) {
          str += '<span class="insert">' + this.escape(text) + "</span>" + nSpace[i];
        } else {
          let pre = "";

          for (n = o_n.row + 1; n < out.o.length && (out.o[n].text == null || out.o[n].row < i); n++ ) {
            let o_o = out.o[n];
            let text = (typeof o_o === 'string')? o_o: o_o.text;
            pre += '<span class="remove">' + this.escape(text) + "</span>" + oSpace[n];
          }
          str += " " + o_n.text + nSpace[i] + pre;
        }
      }
    }

    return str;
  }

  private diff( o, n ) {
    var ns = new Object();
    var os = new Object();

    for ( let i = 0; i < n.length; i++ ) {
      if ( ns[ n[i] ] == null )
        ns[ n[i] ] = { rows: new Array(), o: null };
      ns[ n[i] ].rows.push( i );
    }

    for ( let i = 0; i < o.length; i++ ) {
      if ( os[ o[i] ] == null )
        os[ o[i] ] = { rows: new Array(), n: null };
      os[ o[i] ].rows.push( i );
    }

    for ( let i in ns ) {
      if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
        n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
        o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
      }
    }

    for ( let i = 0; i < n.length - 1; i++ ) {
      if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null &&
           n[i+1] == o[ n[i].row + 1 ] ) {
        n[i+1] = { text: n[i+1], row: n[i].row + 1 };
        o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
      }
    }

    for ( let i = n.length - 1; i > 0; i-- ) {
      if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null &&
           n[i-1] == o[ n[i].row - 1 ] ) {
        n[i-1] = { text: n[i-1], row: n[i].row - 1 };
        o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
      }
    }

    return { o: o, n: n };
  }

  escape(s) {
      var n = s;
      if (n) {
        n = n.replace(/&/g, "&amp;");
        n = n.replace(/</g, "&lt;");
        n = n.replace(/>/g, "&gt;");
        n = n.replace(/"/g, "&quot;");
      }
      else {
        alert("got " + n);
      }
      return n;
  }

}
