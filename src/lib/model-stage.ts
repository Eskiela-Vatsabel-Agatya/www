export type StageState='idle'|'armed'|'loading'|'ready'|'failed'|'constrained';
export type StageEvent='NEAR'|'LOAD'|'SUCCESS'|'ERROR'|'TIMEOUT'|'RETRY'|'CONSTRAINED'|'MANUAL_LOAD';
const transitions:Record<StageState,Partial<Record<StageEvent,StageState>>>={idle:{NEAR:'armed',CONSTRAINED:'constrained'},armed:{LOAD:'loading',CONSTRAINED:'constrained'},loading:{SUCCESS:'ready',ERROR:'failed',TIMEOUT:'failed'},ready:{},failed:{RETRY:'armed'},constrained:{MANUAL_LOAD:'loading'}};
export const transition=(state:StageState,event:StageEvent):StageState=>transitions[state][event]??state;
