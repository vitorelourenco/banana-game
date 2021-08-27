import Game from './Game';

export default interface Drawable{
  draw():void;
  updateState(game:Game):void;
}
