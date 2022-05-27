/* eslint-disable react/no-unused-state */
import React from 'react';
import { Loading, NoData } from '../index';
import { M_Table } from './table.model';
import * as Comp from './Composition';
import Context from './Context';

interface Props<T> {
  loading?: boolean;
  data: T[];
  className?: string;
  styles?: Comp.Styles;
  children: JSX.Element[];
  header: M_Table.header[];
  config?: {
    check?: M_Table.config.check<T>;
    order?: M_Table.config.order;
  };
}

export class Table<T> extends React.Component<Props<T>, M_Table.state> {
  static Order = Comp.Order;
  static Head = Comp.Head;
  static Body = Comp.Body;
  static Td = Comp.Td;
  static Th = Comp.Th;
  static Row = Comp.Row;
  headerRef: React.RefObject<HTMLDivElement>;
  bodyRef: React.RefObject<HTMLUListElement>;
  constructor(props: Props<T>) {
    super(props);
    this.headerRef = React.createRef();
    this.bodyRef = React.createRef();
    this.state = { header: [], windowSize: window.innerWidth };
  }

  static getDerivedStateFromProps<T>(props: Props<T>, state: M_Table.state): M_Table.state {
    const header = state.header.map((column, i) => {
      const { hidden } = props.header[i];
      if (hidden !== undefined) column = { ...column, hidden };
      return column;
    });
    return { ...state, header };
  }

  componentDidMount(): void {
    const header = this.headerRef.current;
    const body = this.bodyRef.current;
    if (body && header) {
      const grid = body.querySelector('.ReactVirtualized__Grid');
      if (header) {
        let target = grid ? grid : body;
        target.addEventListener('scroll', (e) => {
          const { scrollLeft } = e.target as HTMLElement;
          if (header) header.scrollLeft = scrollLeft;
        });
      }
    }
    this.setState({ header: this.props.header });
    window.addEventListener('resize', this.windowsize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowsize);
  }

  windowsize = () => this.setState({ windowSize: window.innerWidth });

  render(): JSX.Element {
    const { styles, children, loading, data, config } = this.props;
    return (
      <Context.Provider
        value={{
          data,
          state: this.state,
          setState: this.setState.bind(this),
          config: { check: config?.check || null, order: config?.order || null },
        }}
      >
        <Comp.TableWrapper className="ssr_table__wrapper" {...styles}>
          <div className="ssr_table">
            <div ref={this.headerRef} className="ssr_table_header__wrapper">
              <ul className="ssr_table__head">{children[0]}</ul>
            </div>
            <div className="ssr_table_body__wrapper">
              <div className="ssr_table__container">
                {!!loading && <Loading />}
                <ul ref={this.bodyRef} className="ssr_table__body">
                  {children[1]}
                </ul>
                {!loading && !data.length && <NoData text="데이터가 존재하지 않습니다." />}
              </div>
            </div>
          </div>
        </Comp.TableWrapper>
      </Context.Provider>
    );
  }
}
