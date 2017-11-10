import 'antd/dist/antd.css';
import 'regenerator-runtime/runtime';

import { Avatar, Breadcrumb, Button, Col, Icon, Input, Layout, LocaleProvider, Menu, Modal, Row, Upload } from 'antd';
import {
  Link,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import { getCookie, getUrlFormat } from 'util.js'

import { DocumentsList } from './documents_list.jsx'
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import enUS from 'antd/lib/locale-provider/en_US';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;


class DocumentTab extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return (
      <Router>
        <Content style={{ paddingLeft: 18, paddingRight: 18, paddingTop: 8, margin: 0, minHeight: 280 }}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{ padding: 0 }}
          >
            <Menu.Item key="uploaded-documents">
              <Link to="/test/documents/uploaded"><Icon type="mail" />Uploaded Documents</Link>
            </Menu.Item>
            <Menu.Item key="collected-documents">
              <Link to="/test/documents/collected"><Icon type="heart-o" />Collected Documents</Link>
            </Menu.Item>
            <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
            </Menu.Item>
          </Menu>
          <Route exact path="/test/documents" component={UploadedDocuments}/>
          <Route path="/test/documents/uploaded" component={UploadedDocuments}/>
          <Route path="/test/documents/collected" component={Test}/>
        </Content>
      </Router>
    );
  }
}

class UploadedDocuments extends React.Component {
  constructor() {
    super();
    this.state = {
      uploadedDocumentFileList: [],
      uploadedDocumentName: undefined,
      onlineDocumentUrl: undefined,
      onlineDocumentName: undefined,
    }
    this.uploadedDocumentTable = undefined
    this.uploadLocalDocument = () => {
      var data = new FormData()
      data.append('title', this.state.uploadedDocumentName)
      data.append('file_upload', this.state.uploadedDocumentFileList[0])
      data.append('csrfmiddlewaretoken', getCookie('csrftoken'))
      axios.post('/user_dashboard/handle_file_upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        this.setState({ uploadedDocumentFileList: [] })
        this.setState({ uploadedDocumentName: '' })
        this.uploadedDocumentTable.updateData()
      })
    }
    this.uploadOnlineDocument = () => {
      var data = new FormData()
      data.append('title', this.state.onlineDocumentName)
      data.append('external_url', this.state.onlineDocumentUrl)
      data.append('csrfmiddlewaretoken', getCookie('csrftoken'))
      axios.post('/user_dashboard/handle_file_upload', data)
        .then(() => {
          this.setState({ onlineDocumentName: '' })
          this.setState({ onlineDocumentUrl: '' })
          this.uploadedDocumentTable.updateData()
        })
    }
  }
  render() {
    self = this;
    var uploadProps = {
      accept: 'application/pdf',
      showUploadList: true,
      beforeUpload(file, fileList) { self.setState({ uploadedDocumentFileList: [file] }); return false },
      fileList: this.state.uploadedDocumentFileList,
    }
    return (
      <div> 
        <div style={{ overflow: 'auto', backgroundColor: 'white', marginTop: 18, boxShadow: '2px 3px 8px rgba(0, 0, 0, .25)' }}>
          <DocumentsList ref={(ele) => this.uploadedDocumentTable = ele} />
        </div>
        <div style={{ overflow: 'auto', backgroundColor: 'white', marginTop: 18, padding: 18, boxShadow: '2px 3px 8px rgba(0, 0, 0, .25)' }}>
          <Row>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Upload {...uploadProps}>
                <Button style={{ margin: 8 }}>
                  <Icon type="file-add" /> Click to Choose File
                </Button>
              </Upload>
              <Input
                style={{ width: '60%', margin: 8 }}
                onChange={async (e) => this.setState({ uploadedDocumentName: e.target.value })}
                value={this.state.uploadedDocumentName}
              ></Input>
              <div>
                <Button type="primary" icon="upload" style={{ margin: 8 }} onClick={this.uploadLocalDocument}>upload</Button>
              </div>
            </Col>
            <Col span={12} style={{ textAlign: 'left' }}>
              <Input
                style={{ width: '60%', margin: 8 }}
                onChange={async (e) => this.setState({ onlineDocumentUrl: e.target.value })}
                value={this.state.onlineDocumentUrl}
              >
              </Input>
              <Input
                style={{ width: '60%', margin: 8 }}
                onChange={async (e) => this.setState({ onlineDocumentName: e.target.value })}
                value={this.state.onlineDocumentName}
              >
              </Input>
              <div>
                <Button type="primary" icon="upload" style={{ margin: 8 }} onClick={this.uploadOnlineDocument}>upload</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div> 
    )
  }
}

const Test = ({}) => {
  return (
    <div style={{ overflow: 'auto', backgroundColor: 'white', marginTop: 18, boxShadow: '2px 3px 8px rgba(0, 0, 0, .25)' }}>
      <DocumentsList />
    </div>
  )
}

export { DocumentTab };