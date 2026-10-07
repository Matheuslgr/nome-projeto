import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default class Busca extends Component {
  state = {
    termoDeBusca: '',
  };

  onTermoAlterado = (event) => {
    const valor = event.target.value;
    this.setState({ termoDeBusca: valor });
    console.log(valor);
  };

  render() {
    return (
      <div className="flex flex-column align-items-center">
        <span className="p-input-icon-left w-full">
          <i className="pi pi-search" />
          <InputText
            className="w-full"
            onChange={this.onTermoAlterado}
            placeholder={this.props.dica}
            value={this.state.termoDeBusca}
          />
        </span>

        <Button label="OK" className="p-button-outlined mt-2 w-full" />
      </div>
    );
  }
}

Busca.defaultProps = {
  dica: 'Digite algo que deseja ver...',
};
