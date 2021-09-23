const totalOnline = document.querySelector('.total_online');
const player = document.querySelector('.player_info');
const getInfoBtn = document.querySelector('.get_info');
const input = document.querySelector('.input_name');
const guildPlayers = document.querySelector('.guild_players');
const guildOfficers = document.querySelector('.guild_officers');
const guildLead = document.querySelector('.guild_lead');

let arrOfNames = [];

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const checkTag = (res) => {
    if (res.guild.tag != undefined || res.guild.tag != null)
        return res.guild.tag;
    else return `No tag`;
};

const checkStatus = (rank) => {
    switch (rank) {
        case 'PLAYER':
            return 'player';
        case 'VIP':
            return 'vip';
        case 'PREMIUM':
            return 'premium';
        case 'HOLY':
            return 'holy';
        case 'IMMORTAL':
            return 'immortal';
        case 'BUILDER':
            return 'builder';
        case 'MAPLEAD':
            return 'maplead';
        case 'YOUTUBE':
            return 'youtube';
        case 'DEV':
            return 'dev';
        case 'ORGANIZER':
            return 'organizer';
        case 'MODER':
            return 'moder';
        case 'WARDEN':
            return 'warden';
        case 'CHIEF':
            return 'chief';
        case 'ADMIN':
            return 'admin';
    }
};

const checkGuildRank = (status, temp) => {
    if (status != temp) return ' hide';
    if ((status = temp)) return '';
};

let tempName = '';
const isInTheGuild = (name) => {
    const guildPlayer = document.querySelectorAll('.guild_player');
    guildPlayer.forEach((data) => {
        if (name == data.dataset.username) {
            tempName = data.dataset.username;
            data.classList.add('inGuild');
        }
    });
};

let members = 0,
    officers = 0;
const countMembers = (member) => {
    switch (member.status) {
        case 'MEMBER':
            members++;
            break;
        case 'OFFICER':
            officers++;
            break;
        default:
            break;
    }
};

getInfoBtn.onclick = (e) => {
    e.preventDefault();
    if (tempName != '') {
        const guildPlayer = document.querySelectorAll('.guild_player');
        guildPlayer.forEach((data) => {
            if (tempName == data.dataset.username)
                data.classList.remove('inGuild');
        });
    }
    document
        .querySelector('.guild_lead')
        .scrollIntoView({ block: 'start', behavior: 'smooth' });
    isInTheGuild(input.value.toLowerCase());
    input.value = '';
};

const offs = document.querySelector('.officers');
const membs = document.querySelector('.members');
getData(`https://api.vimeworld.ru/guild/get?id=31241`).then((result) => {
    for (let i = 0; i != result.members.length; i++) {
        countMembers(result.members[i]);
        guildLead.innerHTML += `
                <div class="guild_player ${checkGuildRank(
                    result.members[i].status,
                    'LEADER'
                )}" data-username="${result.members[
            i
        ].user.username.toLowerCase()}">
                <a class="${checkStatus(
                    result.members[i].user.rank
                )} hover" href="${`https://vimetop.ru/player/${result.members[i].user.username}`}" target="_blank"><img class="player_img" src="${`http://skin.vimeworld.ru/head/${result.members[i].user.username}.png`}" alt="da"><br>${
            result.members[i].user.username
        }</a>
                    <span>id - ${result.members[i].user.id}</span>
                </div>`;
        guildOfficers.innerHTML += `
                <div class="guild_player ${checkGuildRank(
                    result.members[i].status,
                    'OFFICER'
                )}" data-username="${result.members[
            i
        ].user.username.toLowerCase()}">
                    <a class="${checkStatus(
                        result.members[i].user.rank
                    )} hover" href="${`https://vimetop.ru/player/${result.members[i].user.username}`}" target="_blank"><img class="player_img" src="${`http://skin.vimeworld.ru/head/${result.members[i].user.username}.png`}" alt="da"><br>${
            result.members[i].user.username
        }</a>
                    <span>id - ${result.members[i].user.id}</span>
                </div>`;
        guildPlayers.innerHTML += `
                <div class="guild_player ${checkGuildRank(
                    result.members[i].status,
                    'MEMBER'
                )}" data-username="${result.members[
            i
        ].user.username.toLowerCase()}">
                    <a class="${checkStatus(
                        result.members[i].user.rank
                    )} hover" href="${`https://vimetop.ru/player/${result.members[i].user.username}`}" target="_blank"><img class="player_img" src="${`http://skin.vimeworld.ru/head/${result.members[i].user.username}.png`}" alt="da"><br>${
            result.members[i].user.username
        }</a>
                    <span>id - ${result.members[i].user.id}</span>
                </div>`;
    }
    offs.innerHTML += ` - ${officers}`;
    membs.innerHTML += ` - ${members}`;
});
