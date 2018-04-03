import * as React from 'react';
import { lighten } from 'polished';
import { merge, withStyles } from 'styles';
import { svgToImage } from 'utils';
import SignatureResetButton from './SignatureResetButton';

const enhance = withStyles((styles) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1.5rem 0',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  svg: {
    backgroundColor: 'white',
    '&[data-drawing]': {
      cursor: 'crosshair',
    },
  },
  yellowBg: {
    backgroundColor: lighten(0.5, 'yellow'),
  },
}));

const noop = () => {};

const isTouchEvent = (evt) => evt.type.indexOf('touch') >= 0;

const getDrawCoords = (evt) => {
  const el = isTouchEvent(evt) ? evt.targetTouches[0] : evt;
  const { left, top } = el.target.getBoundingClientRect();
  return `${el.clientX - left},${el.clientY - top}`;
};

let passiveSupported = false;

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      passiveSupported = true;
    },
  });

  window.addEventListener('test', null, opts);
} catch (err) {}

type Props = {
  classes: any,
  onDraw: Function,
  showBackground: boolean,
  showControls: boolean,
  showSaveButton: boolean,
  showResetButton: boolean,
  signatureLineHeight: number,
  strokeOnSave: string,
  yellowBg: boolean,
};

type State = {
  history: Array<any>,
  historyUndo: Array<any>,
};

class Signature extends React.Component<Props, State> {
  static defaultProps = {
    onDraw: noop,
    height: 100,
    width: 310,
    showBackground: true,
    showControls: true,
    showSaveButton: false,
    showSignatureLine: false,
    showResetButton: true,
    signatureLineHeight: 0.7,
    yellowBg: false,
  };

  state = {
    history: [],
    historyUndo: [],
  };

  componentDidMount() {
    this.fixDimensions();
    window.addEventListener('resize', this.fixDimensions);
    window.addEventListener(
      'touchstart',
      this.handleDrawStart,
      passiveSupported ? { passive: false } : false,
    );
    window.addEventListener(
      'touchmove',
      this.handleDrawMove,
      passiveSupported ? { passive: false } : false,
    );
    window.addEventListener(
      'touchend',
      this.handleDrawEnd,
      passiveSupported ? { passive: false } : false,
    );
  }

  componentDidUpdate(lastProps, lastState) {
    if (
      this.state.history.length !== lastState.history.length ||
      this.state.historyUndo.length !== lastState.historyUndo.length
    )
      this.props.onDraw(
        svgToImage(this.svg, {
          exclude: [this.signatureLine],
        }),
      );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fixDimensions);
    window.removeEventListener('touchstart', this.handleDrawStart);
    window.removeEventListener('touchmove', this.handleDrawMove);
    window.removeEventListener('touchend', this.handleDrawEnd);
  }

  fixDimensions = () => {
    const { width: widthProp, signatureLineHeight } = this.props;

    const width = Math.min(Math.max(400, widthProp), window.innerWidth);

    const height = width * 0.33;

    this.svg.setAttribute('width', width);
    this.svg.setAttribute('height', height);

    if (this.signatureLine) {
      this.signatureLine.setAttribute('x1', 0);
      this.signatureLine.setAttribute('x2', width);
      this.signatureLine.setAttribute('y1', height * signatureLineHeight);
      this.signatureLine.setAttribute('y2', height * signatureLineHeight);
    }
  };

  getPath = () => {
    if (!this.path) return '';
    return this.path.getAttribute('d') || '';
  };

  setPath = (pathData) => this.path.setAttribute('d', pathData);

  clearPath = () => this.path.removeAttribute('d');

  handleDrawStart = (evt) => {
    if (!this.svg.contains(evt.target)) return;

    if (isTouchEvent(evt)) {
      this._touching = true;
      evt.preventDefault();
    } else if (evt.button !== 0) {
      return;
    }

    this._drawing = true;
    this.svg.setAttribute('data-drawing', '');

    this.newPath = this.getPath() + `M ${getDrawCoords(evt)} `;
    this.setPath(this.newPath);
  };

  handleDrawMove = (evt) => {
    if (!this._drawing) return;

    if (this._touching) evt.preventDefault();

    this.newPath += `L${getDrawCoords(evt)} `;
    this.setPath(this.newPath);
  };

  handleDrawEnd = (evt) => {
    if (!this._drawing) return;

    if (this._touching) evt.preventDefault();

    const newPath = this.newPath;

    this.newPath = null;
    this._drawing = false;
    this._touching = false;

    this.svg.removeAttribute('data-drawing');

    this.setState(({ history, historyUndo }) => ({
      history: history.concat(newPath),
      historyUndo: historyUndo.length > 0 ? [] : historyUndo,
    }));
  };

  handleClearClick = () => {
    this.clearPath();
    this.setState({ history: [], historyUndo: [] });
  };

  handleUndoClick = () =>
    this.setState(({ history, historyUndo }) => {
      if (!history.length) return;
      const undoPathData = history.pop();
      this.setPath(history.join(''));
      return {
        history,
        historyUndo: historyUndo.concat(undoPathData),
      };
    });

  handleRedoClick = () =>
    this.setState(({ history, historyUndo }) => {
      if (!historyUndo.length) return;
      const redoPathData = historyUndo.pop();
      const newHistory = history.concat(redoPathData);
      this.setPath(newHistory.join(''));
      return {
        history: newHistory,
        historyUndo,
      };
    });

  handleSaveClick = () => {
    window.location.href = this.getImageData();
  };

  render() {
    const {
      classes,
      className,
      yellowBg,
      showResetButton,
      showSignatureLine,
    } = this.props;

    return (
      <div
        className={merge(classes.root, className)}
        ref={(node) => (this.container = node)}
      >
        {showResetButton && (
          <SignatureResetButton onResetClick={this.handleClearClick} />
        )}
        <svg
          ref={(node) => (this.svg = node)}
          onMouseDown={this.handleDrawStart}
          onMouseMove={this.handleDrawMove}
          onMouseUp={this.handleDrawEnd}
          className={merge(classes.svg, yellowBg && classes.yellowBg)}
        >
          <path
            ref={(node) => (this.path = node)}
            stroke="currentColor"
            strokeWidth={3}
            fill="none"
            pointerEvents="none"
          />
          {showSignatureLine && (
            <line
              ref={(node) => (this.signatureLine = node)}
              pointerEvents="none"
              shapeRendering="crispEdges"
              stroke="currentColor"
              strokeDasharray="5, 5"
            />
          )}
        </svg>
      </div>
    );
  }
}

export default enhance(Signature);
