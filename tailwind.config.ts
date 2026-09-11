import type { Config } from 'tailwindcss';
export default { content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme:{extend:{colors:{cf:{primary:'#426B2F',dark:'#17352A',bg:'#F8FAF6',text:'#18201B',muted:'#5F685F',border:'#E3E9E1',accent:'#DDECCF'}}}}, plugins:[] } satisfies Config;
