
const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzčř'.split('');

function encode (z) {
    let r = '';
    let n = (z || (Math.random() * 4294967294)) - 2147483647;
    do {
        r = DIGITS[n & 0x3f] + r; // eslint-disable-line no-bitwise
        n >>>= 6; // eslint-disable-line no-bitwise
    } while (n !== 0);
    return r;
}

function randomId () {
    let r = '';
    for (let k = 0; k < 12; k++) {
        r += encode();
    }
    return `${encode(Math.floor(Date.now() / 1000))}${r}`.substr(0, 64);
}

function setCookie (name, val, path = '/', secure = false) {
    const scr = secure ? ';secure' : '';
    document.cookie = `${name}=${val};path=${path};expires=Fri, 31 Dec 9999 23:59:59 GMT;${scr}sameSite=lax;`;
}

function createDlAndRenderComponent (
    cfg,
    componentCfg,
    targetEl,
    onAttach,
    userId = null,
    conversationId = null
) {
    let init = false;
    let uid = userId;
    let cid = conversationId;

    if (!uid) {
        uid = randomId();
        setCookie('wingbotUserId', uid, cfg.path, cfg.secure);
    }

    const directLineConfig = { secret: cfg.secret };

    if (cfg.restoreConversation && cid) {
        directLineConfig.conversationId = cid;
        directLineConfig.watermark = 1;
        init = true;
    }

    // @ts-ignore
    const dl = new window.BotChat.DirectLine(directLineConfig);

    dl.postBack = function (a, d) {
        return this.postActivity({
            type: 'event',
            name: 'postBack',
            from: { id: uid },
            value: { action: a, data: d || {} }
        });
    };

    if (cfg.initAction && !init) {
        dl.connectionStatus$.subscribe((cs) => {
            if (cs === 4) {
                // it failed, we'll re-start the component
                createDlAndRenderComponent(cfg, componentCfg, targetEl, onAttach, uid);
            } else if (!init && cs === 2) {
                init = true;
                onAttach(dl);
                dl.postBack(cfg.initAction, cfg.initData)
                    .subscribe(cfg.onInit || ((x) => {
                        console.log('initialized', x); // eslint-disable-line no-console
                    }));
            }
        });
    } else if (targetEl) {
        dl.connectionStatus$.subscribe((cs) => {
            if (cs === 4) {
                // it failed, we'll re-start the component
                createDlAndRenderComponent(cfg, componentCfg, targetEl, onAttach, uid);
            } else if (cs === 2) {
                onAttach(dl);
            }
        });
    }
    if (cfg.restoreConversation) {
        dl.activity$.subscribe((a) => {
            if (!cid && a.conversation) {
                cid = a.conversation.id;
                setCookie('wingbotCid', cid, cfg.path, cfg.secure);
            }
        });
    }

    if (targetEl) {
        // cleanup the element
        while (targetEl.firstChild) {
            targetEl.removeChild(targetEl.firstChild);
        }

        const into = document.createElement('div');

        targetEl.appendChild(into);

        const cmpc = componentCfg || {};
        cmpc.user = { id: uid, name: cfg.userName || 'You' };
        cmpc.botConnection = dl;

        // @ts-ignore
        window.BotChat.App(cmpc, into);
    }

    onAttach(dl);

    return dl;
}

/**
 * @param {Object} cfg
 * @param {string} cfg.secret - botservice secret
 * @param {string} [cfg.userID] - pass custom user id
 * @param {string} [cfg.conversationID] - pass custom conversation ID
 * @param {string} [cfg.userName] - pass custom user name
 * @param {string} [cfg.initAction] - path of the wingbot init action
 * @param {string} [cfg.initData] - optional init action data
 * @param {Function} [cfg.onInit] - init callback
 * @param {boolean} [cfg.secure] - use true for using on https protocol
 * @param {string} [cfg.path] - limit userId only to single path in domain (`/` is default)
 * @param {boolean} [cfg.restoreConversation] - use true to continue in conversation
 * @param {Object} componentCfg - configuration of webchat component
 * @param {Object} targetEl - element, where to insert the chat
 * @param {Function} onAttach - called when component attached
 * @returns {Object} - DirectLine object with new postBack(action[,data={}]) method
 */
export default function (cfg, componentCfg, targetEl, onAttach = () => {}) {
    const uidMatch = (document.cookie || '').match(/wingbotUserId=([^&;\s]+)/i);
    const cidMatch = (document.cookie || '').match(/wingbotCid=([^&;\s]+)/i);

    let uid = null;

    if (cfg.userID) {
        uid = cfg.userID;
        setCookie('wingbotUserId', uid, cfg.path, cfg.secure);
    } else if (uidMatch) {
        [, uid] = uidMatch;
    }


    let cid = null;

    if (cfg.conversationID) {
        cid = cfg.conversationID;
        setCookie('wingbotCid', cid, cfg.path, cfg.secure);
    } else if (cidMatch) {
        [, cid] = cidMatch;
    }

    return createDlAndRenderComponent(cfg, componentCfg, targetEl, onAttach, uid, cid);
}
