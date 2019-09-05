<<<<<<< HEAD
//係数の設定
//移動用
let A = 0; //ゴールラインに対する前後の移動距離の係数
let B = 1; //ディフェンスとの最短距離の係数
//パス用

let C = 1; //ボールを持っているプレイヤーとディフェンスとの最短距離の係数
let D = 1; //パスを受けるプレイヤーとディフェンスとの最短距離の係数
let E = -1; //パスの距離の係数
//変数の設定
let forward_param;
let eval_list = [];
let action_list = [];
let movablelist = movablelistFunc(pos, turn, select, tagged);
let passlist = passlistFunc(pos, turn, select, ball);
action_list = action_list.concat(movablelist);
action_list = action_list.concat(passlist);
[checkmateFlag, x, y] = CheckMateFunc(pos, turn, select, ball);

//トライorインターセプトができる場合はその行動を返す
if (checkmateFlag == 1) {
  return_arr = [[x, y], eval_list];
}

//移動の評価値計算
for (let i = 0; i < movablelist.length; i++) {
  distance_defense = dis_defense_arr_func(
    pos,
    movablelist[i][0],
    movablelist[i][1]
  ); //ディフェンスとの距離リスト
  distance_defense_min = Math.min.apply(null, distance_defense); //ディフェンスとの最小距離
  back_forth_from_goalline = -(movablelist[i][1] - pos[1][select][1]); //ゴールラインに対する前後の移動距離
  [horizontal_diff_from_ball, vertical_diff_from_ball] = difffromhBallFunc(
    pos,
    ball,
    select,
    movablelist[i][0],
    movablelist[i][1]
  );
  [defenseLine, attackLine] = PosSortTraverse(pos); //defenseLine,attackLineはそれぞれ左からエージェントのIDをリストにしたもの。

  if (vertical_diff_from_ball < 0 && ball != select) {
    tempA = -100;
  } else {
    tempA = A;
  } //ボールを持っているプレイヤーより前に行かない

  //		if (distance_defense_min < 2) {
  //			eval_list.push(-100);
  //			continue;
  //		}

  eval_list.push(
    tempA * back_forth_from_goalline +
      B * distance_defense_min +
      0.1 * Math.random()
  );
}

//パスの評価値計算
for (let i = 0; i < passlist.length; i++) {
  distance_defense_throw_min = Math.min.apply(
    null,
    dis_defense_arr_func(pos, pos[1][select][0], pos[1][select][1])
  ); //ボールを持っているプレイヤーとディフェンスとの最短距離
  pass_distance = distance(
    pos[1][i][0] - pos[1][select][0],
    pos[1][i][1] - pos[1][select][1]
  ); //パスが成功する確率
  distance_defense_catch_min = Math.min.apply(
    null,
    dis_defense_arr_func(pos, passlist[i][0], passlist[i][1])
  ); //パスを受けるプレイヤーとディフェンスとの最短距離
  eval_list.push(
    C * (3 - distance_defense_throw_min) +
      D * distance_defense_catch_min +
      E * pass_distance +
      0.1 * Math.random()
  );
}
best_move_index = eval_list.indexOf(Math.max.apply(null, eval_list));
best_move_array = [
  action_list[best_move_index][0],
  action_list[best_move_index][1]
];
return_arr = [best_move_array, eval_list];
=======
	//係数の設定
	//移動用
	let A = 1; //ゴールラインに対する前後の移動距離の係数
	let B = 1; //ディフェンスとの最短距離の係数
	//パス用

	let C = 1; //ボールを持っているプレイヤーとディフェンスとの最短距離の係数
	let D = 1; //パスを受けるプレイヤーとディフェンスとの最短距離の係数
	let E = -1; //パスの距離の係数
	//変数の設定
	let forward_param;
	let eval_list = [];
	let action_list = [];
	let movablelist = movablelistFunc(pos, turn, select, tagged);
	let passlist = passlistFunc(pos, turn, select, ball);
	action_list = action_list.concat(movablelist);
	action_list = action_list.concat(passlist);
	[checkmateFlag, x, y] = CheckMateFunc(pos, turn, select, ball);

	//トライorインターセプトができる場合はその行動を返す
	if (checkmateFlag == 1) {
		return_arr = [
			[x, y], eval_list
		];
	}

	//移動の評価値計算
	for (let i = 0; i < movablelist.length; i++) {
		distance_defense = dis_defense_arr_func(pos, movablelist[i][0], movablelist[i][1]); //ディフェンスとの距離リスト
		distance_defense_min = Math.min.apply(null, distance_defense); //ディフェンスとの最小距離
		back_forth_from_goalline = -(movablelist[i][1] - pos[1][select][1]); //ゴールラインに対する前後の移動距離
		[horizontal_diff_from_ball, vertical_diff_from_ball] = difffromhBallFunc(pos, ball, select, movablelist[i][0], movablelist[i][1]);
		[defenseLine, attackLine] = PosSortTraverse(pos); //defenseLine,attackLineはそれぞれ左からエージェントのIDをリストにしたもの。

		if (vertical_diff_from_ball < 0 && ball != select) {
			tempA = -100;
		} else {
			tempA = A;
		} //ボールを持っているプレイヤーより前に行かない

		//		if (distance_defense_min < 2) {
		//			eval_list.push(-100);
		//			continue;
		//		}

		eval_list.push(
			tempA * back_forth_from_goalline +
			B * distance_defense_min +
			0.1 * Math.random()
		);
	}

	//パスの評価値計算
	for (let i = 0; i < passlist.length; i++) {
		distance_defense_throw_min = Math.min.apply(null, dis_defense_arr_func(pos, pos[1][select][0], pos[1][select][1])); //ボールを持っているプレイヤーとディフェンスとの最短距離
		pass_distance = distance(pos[1][i][0] - pos[1][select][0], pos[1][i][1] - pos[1][select][1]); //パスが成功する確率
		distance_defense_catch_min = Math.min.apply(null, dis_defense_arr_func(pos, passlist[i][0], passlist[i][1])); //パスを受けるプレイヤーとディフェンスとの最短距離
		eval_list.push(
			C * (3 - distance_defense_throw_min) +
			D * distance_defense_catch_min +
			E * pass_distance +
			0.1 * Math.random()
		);
	}
	best_move_index = eval_list.indexOf(Math.max.apply(null, eval_list));
	best_move_array = [action_list[best_move_index][0], action_list[best_move_index][1]];
	return_arr = [best_move_array, eval_list];
>>>>>>> origin/master
