// 手のイラスト表示機能
// e-typingのように、キーボードの下に左右の手を表示し、
// 次に押すべきキーの指をオレンジ色でハイライトする

const HandGuide = (function () {
  'use strict';

  // 左手のSVGパス（手のひらを上から見た図）
  // 各指は個別のpathで、IDで制御可能
  function createHandSVG(side) {
    const isLeft = side === 'left';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 220');
    svg.setAttribute('class', `hand-svg hand-${side}`);
    svg.setAttribute('width', '140');
    svg.setAttribute('height', '154');

    // 手のひら（ベース）
    const palm = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    palm.setAttribute('class', 'hand-palm');
    if (isLeft) {
      palm.setAttribute('d', 'M50,180 C30,175 20,160 22,140 L25,120 C26,110 30,105 35,100 L40,95 L55,90 L75,88 L110,88 L130,90 L145,95 L155,105 C160,112 162,120 160,130 L155,155 C152,170 145,180 130,185 Z');
    } else {
      palm.setAttribute('d', 'M150,180 C170,175 180,160 178,140 L175,120 C174,110 170,105 165,100 L160,95 L145,90 L125,88 L90,88 L70,90 L55,95 L45,105 C40,112 38,120 40,130 L45,155 C48,170 55,180 70,185 Z');
    }
    svg.appendChild(palm);

    // 指のパス定義
    const fingers = isLeft ? getLeftFingerPaths() : getRightFingerPaths();

    fingers.forEach(f => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', f.d);
      path.setAttribute('class', `hand-finger ${f.cls}`);
      path.setAttribute('data-finger', f.id);
      svg.appendChild(path);

      // 指の爪（小さな楕円）
      if (f.nail) {
        const nail = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        nail.setAttribute('cx', f.nail.cx);
        nail.setAttribute('cy', f.nail.cy);
        nail.setAttribute('rx', f.nail.rx);
        nail.setAttribute('ry', f.nail.ry);
        nail.setAttribute('class', `hand-nail ${f.cls}`);
        nail.setAttribute('data-finger', f.id);
        svg.appendChild(nail);
      }
    });

    return svg;
  }

  // 左手の指パス
  function getLeftFingerPaths() {
    return [
      // 小指（左端）
      {
        id: 'pinky',
        cls: 'finger-pinky',
        d: 'M35,100 L28,70 C26,58 28,48 32,40 C36,32 42,30 46,32 C50,34 52,40 52,50 L50,68 L48,90',
        nail: { cx: 37, cy: 34, rx: 7, ry: 5 }
      },
      // 薬指
      {
        id: 'ring',
        cls: 'finger-ring',
        d: 'M55,90 L52,55 C50,40 52,28 56,18 C60,10 66,8 72,10 C76,12 78,20 78,32 L75,55 L72,88',
        nail: { cx: 63, cy: 10, rx: 8, ry: 5 }
      },
      // 中指
      {
        id: 'middle',
        cls: 'finger-middle',
        d: 'M75,88 L74,48 C73,32 75,18 80,8 C85,0 92,-2 98,2 C103,6 104,16 103,30 L100,52 L97,88',
        nail: { cx: 88, cy: 2, rx: 8, ry: 5 }
      },
      // 人差し指
      {
        id: 'index',
        cls: 'finger-index',
        d: 'M110,88 L112,52 C113,38 115,25 120,16 C125,8 132,6 137,10 C142,14 143,24 141,38 L136,58 L130,88',
        nail: { cx: 128, cy: 10, rx: 8, ry: 5 }
      },
      // 親指
      {
        id: 'thumb',
        cls: 'finger-thumb',
        d: 'M145,95 L158,85 C168,78 178,76 185,80 C192,85 194,94 190,104 C186,112 178,118 168,118 L155,115 L148,108',
        nail: { cx: 188, cy: 86, rx: 6, ry: 8 }
      }
    ];
  }

  // 右手の指パス（左手をミラーリング）
  function getRightFingerPaths() {
    return [
      // 小指（右端）
      {
        id: 'pinky',
        cls: 'finger-pinky',
        d: 'M165,100 L172,70 C174,58 172,48 168,40 C164,32 158,30 154,32 C150,34 148,40 148,50 L150,68 L152,90',
        nail: { cx: 163, cy: 34, rx: 7, ry: 5 }
      },
      // 薬指
      {
        id: 'ring',
        cls: 'finger-ring',
        d: 'M145,90 L148,55 C150,40 148,28 144,18 C140,10 134,8 128,10 C124,12 122,20 122,32 L125,55 L128,88',
        nail: { cx: 137, cy: 10, rx: 8, ry: 5 }
      },
      // 中指
      {
        id: 'middle',
        cls: 'finger-middle',
        d: 'M125,88 L126,48 C127,32 125,18 120,8 C115,0 108,-2 102,2 C97,6 96,16 97,30 L100,52 L103,88',
        nail: { cx: 112, cy: 2, rx: 8, ry: 5 }
      },
      // 人差し指
      {
        id: 'index',
        cls: 'finger-index',
        d: 'M90,88 L88,52 C87,38 85,25 80,16 C75,8 68,6 63,10 C58,14 57,24 59,38 L64,58 L70,88',
        nail: { cx: 72, cy: 10, rx: 8, ry: 5 }
      },
      // 親指
      {
        id: 'thumb',
        cls: 'finger-thumb',
        d: 'M55,95 L42,85 C32,78 22,76 15,80 C8,85 6,94 10,104 C14,112 22,118 32,118 L45,115 L52,108',
        nail: { cx: 12, cy: 86, rx: 6, ry: 8 }
      }
    ];
  }

  // finger番号からSVGのIDへのマッピング
  // finger: 0=左小指, 1=左薬指, 2=左中指, 3=左人差し指,
  //         4=右人差し指, 5=右中指, 6=右薬指, 7=右小指, 8=親指
  const FINGER_TO_SVG = {
    0: { hand: 'left', finger: 'pinky' },
    1: { hand: 'left', finger: 'ring' },
    2: { hand: 'left', finger: 'middle' },
    3: { hand: 'left', finger: 'index' },
    4: { hand: 'right', finger: 'index' },
    5: { hand: 'right', finger: 'middle' },
    6: { hand: 'right', finger: 'ring' },
    7: { hand: 'right', finger: 'pinky' },
    8: { hand: 'both', finger: 'thumb' }  // 親指は両手
  };

  class HandGuideRenderer {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;
      this.render();
    }

    render() {
      this.container.innerHTML = '';
      this.container.className = 'hand-guide-container';

      // 左手ラベル
      const leftLabel = document.createElement('span');
      leftLabel.className = 'hand-label';
      leftLabel.textContent = '左手';

      // 右手ラベル
      const rightLabel = document.createElement('span');
      rightLabel.className = 'hand-label';
      rightLabel.textContent = '右手';

      // 左手SVG
      this.leftHandSvg = createHandSVG('left');
      // 右手SVG
      this.rightHandSvg = createHandSVG('right');

      const leftWrap = document.createElement('div');
      leftWrap.className = 'hand-wrap';
      leftWrap.appendChild(leftLabel);
      leftWrap.appendChild(this.leftHandSvg);

      const rightWrap = document.createElement('div');
      rightWrap.className = 'hand-wrap';
      rightWrap.appendChild(rightLabel);
      rightWrap.appendChild(this.rightHandSvg);

      this.container.appendChild(leftWrap);
      this.container.appendChild(rightWrap);
    }

    // 全指のハイライトをクリア
    clearHighlight() {
      if (!this.container) return;
      const allFingers = this.container.querySelectorAll('.hand-finger, .hand-nail');
      allFingers.forEach(el => {
        el.classList.remove('hand-finger-active');
      });
    }

    // 指番号（FINGER_MAPのfinger値）でハイライト
    highlightFinger(fingerNum) {
      this.clearHighlight();
      if (fingerNum === undefined || fingerNum === null) return;

      const mapping = FINGER_TO_SVG[fingerNum];
      if (!mapping) return;

      if (mapping.hand === 'left' || mapping.hand === 'both') {
        const els = this.leftHandSvg.querySelectorAll(`[data-finger="${mapping.finger}"]`);
        els.forEach(el => el.classList.add('hand-finger-active'));
      }

      if (mapping.hand === 'right' || mapping.hand === 'both') {
        const els = this.rightHandSvg.querySelectorAll(`[data-finger="${mapping.finger}"]`);
        els.forEach(el => el.classList.add('hand-finger-active'));
      }
    }
  }

  return HandGuideRenderer;
})();
