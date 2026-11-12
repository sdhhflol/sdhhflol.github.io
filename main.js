const warning = document.getElementById('warning');
const footertext = document.getElementById('footer-text');
const skip = document.getElementById('skip');
const reload = document.getElementById('reload');
const footer = document.getElementById('footer');
const wall = document.getElementById('wall');
const spinner = document.getElementById('spinner');
const intro = document.getElementById('intro');
const title = document.getElementById('title');
const bbs = document.getElementById('bbs');
const desc = document.getElementById('desc');
const video = document.getElementById('video');

const delay = 8;
const chance = 0.25;
const hold = 0;
const delay2 = 1000;
const wpm = 85;
const opaq = 0.05;

const queue = [
    [reload, 720],
    [spinner, 210],
    [reload, 60],
    [spinner, 120],
    [reload, 60],
    [spinner, 120],
    [reload, 120],
    [spinner, 60],
    [spinner, 210],
    [reload, 60],
    [spinner, 120],
    [reload, 60],
    [spinner, 120],
    [reload, 120],
    [spinner, 60],
    [spinner, 210],
];

const handles = [
    "フィリア",
    "Cornea",
    "ドリームチャイルド",
    "Les Paul",
    "Ice",
    "Ø.",
    "P-O-W-E-R",
    "みなこ",
    "さきや",
    "スリーピーヘッド",
    "ロッド",
    "イカ",
    "Kaiser",
    "S",
    "Free Bird",
    "青猫",
    "よど",
    "ベア",
    "なずな",
    "ロデム",
    "M13",
    "bancy",
    "パスカル",
    "ふゆ",
    "Amica",
    "しのぶ",
    "Multipolar",
    "ひなこ",
    "moto",
    "レモン",
    "Lui-hua",
    "Noah",
    "小川三船",
    "dodon",
    "青い花",
    "Guten-B",
    "カエル",
    "パルステラ"
];


const sentences = [
    "彼女の名前、",
    "“リリイ・シュシュ。”",
    "天才。",
    "というより、",
    "宇宙。",
    "エーテルの具現者。",
    "1999年",
    "十三歳。",
    "色にたとえれば、バラ色。",
    "今が灰色だとすれば。",
    "エーテルが世界を満たしている。",
    "絶望は赤のエーテル。",
    "希望は青のエーテル。",
    "永遠と沈黙。",
    "そこに白いグライダーを飛ばす。",
    "強い光を受ける者の影はまた濃い。",
    "強いエーテルもまたしかり。",
    "生きてるから、リリイに出会えた。",
    "「ありがとう」。",
    "今日は幸せのエーテルをいただきました。",
    "みんなきらい。",
    "でもここは好き。",
    "全ての終わりが、",
    "どれほど素晴らしい事なのか。",
    "腐っていく肉、壊れていく僕。",
    "黒の涙、",
    "青の微笑、",
    "透明な私、",
    "色のない世界。",
    "傷が無いのにイタイイタイ。",
    "傷があるのにイタクナイ。",
    "きれいな綺麗な青い空をミタイナ。",
    "ここにいると、",
    "私の脳が笑う。",
    "オマエハ ツイテイケナイダロ？",
    "居場所を探し続けて、",
    "人は死んでいくんだわ。",
    "リリイは神秘的な存在だけど、",
    "その前に一人の生きてる人間でしょ？",
    "生活費やなんかをマカナッテゆくためには、",
    "それなりのセールスがないと、",
    "活動を続けられない。",
    "リリイは癒し系なんかじゃない！！",
    "なんか\"癒し系\"って押しつけがましい。",
    "排気ガスでじわりじわりと、",
    "ガンに犯される都会人のために、",
    "無謀にもリリイは歌い続ける‥‥。",
    "癒えなかった傷、",
    "癒えたかもしれない傷、",
    "癒えるはずだった傷、",
    "広がって広がって、",
    "体が全部傷になっちゃったら？",
    "それでもRe(再生)するなら、",
    "それが「回復する傷」。",
    "人間にとって最大の心の傷は、",
    "存在。",
    "「回復する傷」を聴く。",
    "存在が癒されていく。",
    "過去から未来へ。",
    "ニンゲンハ、トベナイ。",
    "エーテルとは、かつて、",
    "光の伝播を媒介する媒質として、",
    "この世の中を満たしていると、",
    "信じられていた物質。",
    "でも、リリイのいうエーテルは、",
    "感性の触媒とでもいうべきもの。",
    "そこらへんは、",
    "フィリアさんが一番詳しいで。",
    "「私はここにいるの。」",
    "そう叫びたくて、",
    "これを書いているのかもしれない。"
];

const lines = [
    '《彼女の名前、》',
    '《“リリイ・シュシュ。”》',
    '《宇宙。》',
    '《エーテルの具現者。》',
    '《投稿者：フィリア》',
    '',
    'sdhhf'
];

const ctx = new(window.AudioContext || window.webkitAudioContext)();

const input = ctx.createGain();

const comp = ctx.createDynamicsCompressor();
comp.threshold.value = -24;
comp.knee.value = 12;
comp.ratio.value = 3;
comp.attack.value = 0.003;
comp.release.value = 0.15;

const makeup = ctx.createGain();
makeup.gain.value = 1.3;

const convolver = ctx.createConvolver();
const rate = ctx.sampleRate;
const length = rate * 2.0;
const impulse = ctx.createBuffer(2, length, rate);
const left = impulse.getChannelData(0);
const right = impulse.getChannelData(1);
for (let i = 0; i < length; i++) {
    const env = Math.exp(-3.5 * (i / rate));
    left[i] = (Math.random() * 2 - 1) * env;
    right[i] = (Math.random() * 2 - 1) * env;
}
convolver.buffer = impulse;

const lowpass = ctx.createBiquadFilter();
lowpass.type = 'lowpass';
lowpass.frequency.value = 3000;

const wet = ctx.createGain();
wet.gain.value = 0.3;

const dry = ctx.createGain();
dry.gain.value = 0.7;

input.connect(comp);
comp.connect(makeup);

makeup.connect(dry);
dry.connect(ctx.destination);

makeup.connect(convolver);
convolver.connect(lowpass);
lowpass.connect(wet);
wet.connect(ctx.destination);

const buffers = [];

Promise.all(
    Array.from({
            length: 10
        }, (_, i) =>
        fetch(`assets/keyboard/${i + 1}.wav`)
        .then(r => r.arrayBuffer())
        .then(b => ctx.decodeAudioData(b))
        .then(async decoded => {
            const off = new OfflineAudioContext(
                decoded.numberOfChannels,
                Math.ceil(decoded.duration * 11025),
                11025
            );
            const source = off.createBufferSource();
            source.buffer = decoded;
            source.connect(off.destination);
            source.start(0);
            return await off.startRendering();
        })
    )
).then(list => buffers.push(...list)).catch(() => {});

function click() {
    if (!buffers.length) return;
    const src = ctx.createBufferSource();
    src.buffer = buffers[Math.floor(Math.random() * buffers.length)];
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.008);
    src.connect(gain);
    gain.connect(input);
    src.start();
}


// from lily chou-chou
let fffffffffff;
try {
    const decoder = new TextDecoder('macintosh'),
        d = new TextDecoder('shift-jis'),
        m = new Map();
    for (let i = 0x81; i <= 0xfc; i++) {
        if (i >= 0xa0 && i <= 0xdf) continue;
        for (let j = 0x40; j <= 0xfc; j++) {
            if (j === 0x7f) continue;
            const c = d.decode(new Uint8Array([i, j]));
            if (c && c !== '\ufffd' && !m.has(c)) m.set(c, [i, j])
        }
    }
    for (let i = 0xa1; i <= 0xdf; i++) {
        const c = d.decode(new Uint8Array([i]));
        if (c && c !== '\ufffd' && !m.has(c)) m.set(c, [i])
    }
    fffffffffff = s => {
        const r = [];
        for (let c of s) {
            let k = c.codePointAt(0);
            if (k > 0x20 && k < 0x7f) c = String.fromCodePoint(k + 0xfee0), k = c.codePointAt(0);
            k < 0x80 ? r.push(k) : m.has(c) ? r.push(...m.get(c)) : r.push(0x3f)
        }
        const bytes = new Uint8Array(r);
        return decoder.decode(bytes)
    }
} catch {
    fffffffffff = s => Array.from(s, () => String.fromCharCode(0x80 + Math.floor(Math.random() * 0x80))).join('')
}

const rand = n => Math.floor(Math.random() * n);
const pick = list => list[rand(list.length)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

function wrap(text, cols) {
    const out = [];
    for (let i = 0; i < text.length; i += cols) out.push(text.slice(i, i + cols));
    return out;
}

function post(cols) {
    const pad = n => String(n).padStart(2, '0');
    const lines = [
        `\t#${100000 + rand(899999)}　　${'Re: '.repeat(rand(6))}${pick(sentences).slice(0, 6)}`,
        `HANDLE:　${pick(handles)}　DATE:　${1999 + rand(3)}年${pad(1 + rand(12))}月${pad(1 + rand(28))}日　${pad(rand(24))}時${pad(rand(60))}分`
    ];

    if (Math.random() < 0.7) {
        lines.push(`${pick(handles)} wrote:`, '>');
        for (let i = 0; i < 1 + rand(3); i++) {
            lines.push(...wrap(pick(sentences) + pick(sentences), cols - 2).map(l => '> ' + l));
        }
    }

    for (let i = 0; i < 1 + rand(2); i++) {
        lines.push(...wrap(pick(sentences) + pick(sentences), cols));
    }

    lines.push('　');
    return lines;
}

warning.addEventListener('click', () => {
    ctx.resume();
    warning.parentElement.style.pointerEvents = 'none';

    const a = warning.parentElement.animate([{
            opacity: 1
        },
        {
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'ease',
        fill: 'forwards'
    });

    a.onfinish = () => {
        warning.parentElement.remove();
        play(queue);
    };
});

function play(steps) {
    const [el, ms] = steps[0];
    reload.hidden = el !== reload;
    spinner.hidden = el !== spinner;
    setTimeout(() => {
        if (steps.length > 1) play(steps.slice(1));
        else w();
    }, ms);
}

function w() {
    reload.remove();
    spinner.remove();
    wall.hidden = false;

    const style = getComputedStyle(wall);
    const fs = parseFloat(style.fontSize);
    const lh = parseFloat(style.lineHeight);
    const cols = Math.ceil(innerWidth / fs);
    const rows = Math.ceil(innerHeight / lh);

    let lines = [];
    while (lines.length < rows) lines = lines.concat(post(cols));
    lines = lines.slice(0, rows);

    const els = lines.map(line => {
        const el = document.createElement('div');
        el.style.width = line.length + 'em';
        el.textContent = fffffffffff(line).slice(0, Math.ceil(line.length * 1.5));
        wall.appendChild(el);
        return el;
    });

    setTimeout(() => {
        lines.forEach((line, i) => {
            setTimeout(() => {
                els[i].textContent = line;
                if (Math.random() < chance) click();
            }, i * delay);
        });
        setTimeout(playintro, lines.length * delay + hold);
    }, 600);
}

async function type(text) {
    bbs.textContent = '';
    for (const ch of text) {
        bbs.textContent += ch;
        if (Math.random() < 0.9) click();
        await sleep(wpm * (0.5 + Math.random()));
    }
}


async function mov() {
    await new Promise(resolve => {
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            title.removeEventListener('transitionend', finish);
            resolve();
        };
        title.addEventListener('transitionend', finish);
        title.classList.add('moved');
        setTimeout(finish, 2500);
    });

    desc.hidden = false;
    footer.hidden = false;
    void desc.offsetWidth;
    desc.classList.add('shown');
    footer.classList.add('shown');
}

async function playintro() {
    wall.remove();
    intro.hidden = false;
    bbs.textContent = '';
    await sleep(400);

    const audio = new Audio('assets/Arabesque.mp3');
    audio.loop = true;
    const source = ctx.createMediaElementSource(audio);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    source.connect(gain);
    gain.connect(ctx.destination);
    audio.play().catch(() => {});
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 3.0);

    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        if (!line.trim()) {
            bbs.textContent = '';
            await sleep(delay2);
            continue;
        }

        if (index === lines.length - 1) {
            video.style.display = 'block';
            video.play().catch(() => {});
            video.animate([{
                    opacity: 0
                },
                {
                    opacity: opaq
                }
            ], {
                duration: 2000,
                easing: 'ease',
                fill: 'forwards'
            });
        }

        bbs.textContent = '';
        await sleep(250 + Math.random() * 350);

        await type(fffffffffff(line));
        bbs.textContent = line;
        await sleep(delay2);

        if (index === lines.length - 1) await mov();
    }
}

async function skipintro() {
    const box = document.querySelector('.warning');
    if (box) {
        box.style.pointerEvents = 'none';
        await new Promise(resolve => {
            const a = box.animate([{
                    opacity: 1
                },
                {
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease',
                fill: 'forwards'
            });
            a.onfinish = resolve;
        });
        box.remove();
    }

    reload.remove();
    spinner.remove();
    wall.remove();

    intro.hidden = false;
    bbs.textContent = '';

    video.style.display = 'block';
    video.play().catch(() => {});
    video.animate([{
            opacity: 0
        },
        {
            opacity: opaq
        }
    ], {
        duration: 2000,
        easing: 'ease',
        fill: 'forwards'
    });

    const audio = new Audio('assets/Arabesque.mp3');
    audio.loop = true;
    const source = ctx.createMediaElementSource(audio);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    source.connect(gain);
    gain.connect(ctx.destination);

    ctx.resume().then(() => {
        audio.play().catch(() => {});
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 3.0);
    });

    const last = lines[lines.length - 1];

    await sleep(1500);
    await type(fffffffffff(last));
    bbs.textContent = last;
    await sleep(delay2);

    void title.offsetWidth;
    await mov();
}

let typing = false;

setInterval(async () => {
    if (footertext.closest('#footer').hidden || typing) return;
    typing = true;

    footertext.classList.remove('shake');
    void footertext.offsetWidth;
    footertext.classList.add('shake');

    const quote = sentences[Math.floor(Math.random() * sentences.length)];

    footertext.textContent = '';
    for (let i = 0; i < quote.length; i++) {
        footertext.textContent += fffffffffff(quote)[i];
        if (Math.random() < 0.9) click();
        await sleep(wpm * (0.5 + Math.random()));
    }

    footertext.textContent = quote;
    typing = false;
}, 5000);

skip?.addEventListener('click', skipintro);

if (location.hash === '#end' || new URLSearchParams(location.search).has('end')) {
    skipintro();
}
