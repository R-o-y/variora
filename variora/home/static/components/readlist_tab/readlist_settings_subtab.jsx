import { Input, Button, Row, Form, Col, Spin, Popconfirm, Collapse, notification } from 'antd'
import { getCookie } from 'util.js'

import React from 'react'
import axios from 'axios'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

const { TextArea } = Input
const Panel = Collapse.Panel
const FormItem = Form.Item

class ReadlistSettingsSubtab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readlist: props.readlist,
      readlistSlug: props.readlistSlug,
      readlistName: props.readlist.name,
      readlistDescription: props.readlist.description,
      loading: false,
    }

    this.deleteReadList = () => {
      var data = new FormData()
      data.append('csrfmiddlewaretoken', getCookie('csrftoken'))
      axios.post(this.state.readlist.delete_url, data).then(() => {
        this.props.updateReadlistsCallback(this.state.readlistSlug)
        window.location.href =
          this.props.coterieUUID === undefined ? '/' : `/groups/${this.props.coterieUUID}`
      })
    }

    this.handleSubmit = e => {
      e.preventDefault()
      this.setState({ loading: true })
      const newName = this.state.readlistName
      const newDesc = this.state.readlistDescription

      if (newName == '') {
        this.setState({ loading: false })
        notification['warning']({
          message: (
            <FormattedMessage
              id='app.readlists.message.empty'
              defaultMessage='Readlist name cannot be empty'
            />
          ),
          duration: 4,
        })
        return
      }

      var data1 = new FormData()
      data1.append('new_name', newName)
      data1.append('csrfmiddlewaretoken', getCookie('csrftoken'))

      var data2 = new FormData()
      data2.append('new_desc', newDesc)
      data2.append('csrfmiddlewaretoken', getCookie('csrftoken'))

      axios.post(this.state.readlist.rename_url, data1).then(() => {
        // TODO: refactor this
        this.props.updateReadlistsNameCallback(this.state.readlistSlug, newName)

        const self = this
        axios.post(this.state.readlist.change_desc_url, data2).then(() => {
          self.setState({
            loading: false,
          })
          notification['success']({
            message: (
              <FormattedMessage
                id='app.readlists.message.update'
                defaultMessage='Readlist info updated'
              />
            ),
          })
          // TODO: refactor this
          props.updateData()
        })
      })
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      readlist: props.readlist,
      readlistSlug: props.readlistSlug,
      readlistName: props.readlist.name,
      readlistDescription: props.readlist.description,
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    }

    const buttonItemLayout = {
      wrapperCol: { span: 8, offset: 8 },
    }

    var deleteReadlistSection = (
      <Popconfirm
        title={
          <FormattedMessage
            id='app.readlists.message.delete'
            defaultMessage='Are you sure to delete this readlist? This cannot be undone'
          />
        }
        onConfirm={() => this.deleteReadList()}
        okText='Yes'
        cancelText='No'
      >
        <a style={{ float: 'right', color: '#F2784B', marginRight: '6%' }}>
          {' '}
          <FormattedMessage
            id='app.readlists.message.delete_readlists'
            defaultMessage='Delete this readlist'
          />
        </a>
      </Popconfirm>
    )

    var deleteReadList = (
      <Row>
        <Col>
          <div style={{ marginTop: 18 }}>
            <Collapse accordion>
              <Panel
                header={
                  <FormattedMessage id='app.readlists.danger_zone' defaultMessage='Danger Zone' />
                }
                key='1'
              >
                <span>
                  <FormattedMessage
                    id='app.readlists.message.delete_warning'
                    defaultMessage='Once you delete this list, all followers and you will no longer have access.'
                  />
                </span>
                {deleteReadlistSection}
              </Panel>
            </Collapse>
          </div>
        </Col>
      </Row>
    )

    return (
      <div>
        {deleteReadList}
        <Spin spinning={this.state.loading}>
          <div className={'card'} style={{ overflow: 'auto', marginTop: 16, padding: 18 }}>
            <Form style={{ marginTop: 24 }} onSubmit={this.handleSubmit}>
              <FormItem
                label={<FormattedMessage id='app.readlists.name' defaultMessage='Name' />}
                {...formItemLayout}
              >
                <Input
                  value={this.state.readlistName}
                  onChange={async e => await this.setState({ readlistName: e.target.value })}
                />
              </FormItem>
              <FormItem
                label={
                  <FormattedMessage id='app.readlists.description' defaultMessage='Description' />
                }
                {...formItemLayout}
              >
                <TextArea
                  rows={6}
                  value={this.state.readlistDescription}
                  onChange={async e => {
                    await this.setState({ readlistDescription: e.target.value })
                  }}
                />
              </FormItem>
              <FormItem {...buttonItemLayout}>
                <Button type='primary' htmlType='submit'>
                  <FormattedMessage id='app.readlists.submit' defaultMessage='Submit' />
                </Button>
              </FormItem>
            </Form>
          </div>
        </Spin>
      </div>
    )
  }
}

export { ReadlistSettingsSubtab }
