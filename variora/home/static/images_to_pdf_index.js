import './css/sign_in_index.css'
import 'regenerator-runtime/runtime'

import { Button, Row, Col, Form, Icon, Input, LocaleProvider, Modal, Upload } from 'antd'

import React from 'react'
import ReactDOM from 'react-dom'
import enUS from 'antd/lib/locale-provider/en_US'

import { FormattedMessage, FormattedHTMLMessage, addLocaleData, IntlProvider } from 'react-intl'
import locale_en from 'react-intl/locale-data/en'
import locale_zh from 'react-intl/locale-data/zh'
import { getCookie } from 'util.js'
import messages_zh from './locales/zh.json'
import messages_en from './locales/en.json'
const messages = {
  en: messages_en,
  zh: messages_zh,
}

addLocaleData([...locale_en, ...locale_zh])

const FormItem = Form.Item
const Dragger = Upload.Dragger

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      documentName: 'PDF made by Variora',
    }

    this.fileReader = new FileReader()
    this.jobs = []
    this.isReaderWorking = false

    var self = this
    this.fileReader.onload = function() {
      var img = new Image()
      img.src = self.fileReader.result
      img.onload = function() {
        var newFileList = self.state.fileList
        var index = self.jobs.shift()
        newFileList[index].img = img
        newFileList[index].status = 'done'
        newFileList[index].url = img.src
        newFileList[index].thumbUrl = img.src
        self.setState({ fileList: newFileList })
        if (self.jobs.length > 0) self.work()
        else self.isReaderWorking = false
      }
    }

    this.work = () => {
      self.isReaderWorking = true
      this.fileReader.readAsDataURL(this.state.fileList[this.jobs[0]].file)
    }

    this.handleBeforeUpload = (file, fileList) => {
      var newFileList = this.state.fileList
      newFileList.push({
        file: file,
        status: 'uploading',
        uid: file.uid,
        name: file.name,
        img: undefined,
      })
      this.setState({ fileList: newFileList })

      this.jobs.push([newFileList.length - 1])
      if (!this.isReaderWorking) this.work()

      return false
    }

    this.handleCancel = () => this.setState({ previewVisible: false })

    this.handlePreview = file => {
      this.setState({ previewImage: file.img.src, previewVisible: true })
    }

    this.handleRemove = file => {
      for (var i = 0; i < this.state.fileList.length; i++) {
        if (this.state.fileList[i].uid === file.uid) {
          var newFileList = this.state.fileList
          newFileList.splice(i, 1)
          this.setState({ fileList: newFileList })
          break
        }
      }
    }

    this.handleDocNameChange = e => {
      this.setState({ documentName: e.target.value })
    }

    this.makePdf = () => {
      var doc = new jsPDF() //new jsPDF('p', 'mm', [297, 210])
      var numPage = 1

      // doc.text('Made with Variora', 8, 8)

      for (var pageIndex = 1; pageIndex <= this.state.fileList.length; pageIndex++) {
        var img = this.state.fileList[pageIndex - 1].img
        if (pageIndex > 1) {
          doc.addPage()
          doc.setPage(pageIndex)
        }
        var height,
          width,
          x,
          y = 0
        if (img.height / img.width > 297 / 210) {
          height = 297
          width = (297 / img.height) * img.width
          y = 0
          x = (210 - width) / 2
        } else {
          width = 210
          height = (210 / img.width) * img.height
          x = 0
          y = (297 - height) / 2
        }
        doc.addImage(img, 'JPEG', x, y, width, height)
      }

      doc.save(this.state.documentName + '.pdf')
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )

    var props = {
      name: 'file',
      multiple: true,
      showUploadList: true,
      listType: 'picture',
      action: '',
      fileList: this.state.fileList,
      onPreview: this.handlePreview,
      beforeUpload: this.handleBeforeUpload,
      onRemove: this.handleRemove,
    }

    var language = getCookie('language') || 'en'
    console.log(language)

    return (
      <IntlProvider locale={language} messages={messages[language]}>
        <div className='clearfix'>
          {/* <Row style={{ textAlign: 'center', marginTop: 18 }}>
          <a href='/'><img src="/media/logo.png" height={66} /></a>
        </Row> */}

          <Row style={{ marginTop: '8%', marginBottom: '6%' }}>
            <Col span={8} offset={4}>
              <Dragger {...props} style={{ padding: 18 }} accept='image/png, image/jpeg'>
                <p className='ant-upload-drag-icon'>
                  <Icon type='inbox' />
                </p>
                <p className='ant-upload-hint'>
                  <FormattedMessage
                    id='app.document.convert.instruction'
                    defaultMessage='Click or drag image(s) to this area. They will be put into one PDF document.'
                  />
                </p>
                {/* <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p> */}
              </Dragger>
            </Col>

            <Col span={8} style={{ paddingLeft: 28 }}>
              <Form.Item
                label={
                  <FormattedMessage
                    id='app.document.convert.document'
                    defaultMessage='Name of the document'
                  />
                }
              >
                <Input value={this.state.documentName} onChange={this.handleDocNameChange} />
              </Form.Item>
              <Button type='primary' className='login-form-button' onClick={this.makePdf}>
                <FormattedMessage
                  id='app.document.convert.pdf'
                  defaultMessage='Make a PDF document from the selected images'
                />
              </Button>
              <br />
              <br />
              <FormattedMessage
                id='app.document.convert.info'
                defaultMessage='For more features and customizability, we recommend '
              />
              <a target='_blank' href='https://www.camscanner.com/user/download'>
                CamScanner
              </a>
            </Col>
          </Row>

          {/* <Upload
          action=""
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          beforeUpload={this.handleBeforeUpload}
        >
          {uploadButton}
        </Upload> */}

          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt='example' style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </IntlProvider>
    )
  }
}

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Main />
  </LocaleProvider>,
  document.getElementById('main'),
)

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">

//     <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>

//     <script
//     src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
//     integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
//     crossorigin="anonymous"></script>

//     <title>Document</title>
// </head>
// <body>
//     <form action="">
//         <input type="file" onchange="addFile(this.files)">
//         <input type="file" onchange="addFile(this.files)">
//         <button type="button" id="btn"> to pdf </button>
//     </form>

// </body>
// <script>
// var images = []
// var reader = new FileReader()

// reader.onload = function() { // file is loaded
//     var img = new Image()
//     img.onload = function() {
//         images.push(img)
//         // console.log(images)
//         // console.log(img.width)
//         // console.log(img.height)
//         document.getElementById("btn").disabled = false
//     };
//     img.src = reader.result;
// }

// function addFile(file) {
//     document.getElementById("btn").disabled = true
//     file = file[0]
//     reader.readAsDataURL(file);
// }

// $(document).ready(function() {
//     $('#btn').on('click', function() {
//         var doc = new jsPDF()  //new jsPDF('p', 'mm', [297, 210])
//         var numPage = 1

//         doc.text('Made with Variora', 8, 8)

//         for (var pageIndex = 1; pageIndex <= images.length; pageIndex++) {
//             var img = images[pageIndex - 1]
//             if (pageIndex > 1) {
//                 doc.addPage()
//                 doc.setPage(pageIndex)
//             }
//             var height, width, x, y = 0
//             if (img.height / img.width > 297 / 210) {
//                 height = 297
//                 width = 297 / img.height * img.width
//                 y = 0
//                 x = (210 - width) / 2
//             } else {
//                 width = 210
//                 height = 210 / img.width * img.height
//                 x = 0
//                 y = (297 - height) / 2
//             }
//             doc.addImage(img, 'JPEG', x, y, width, height)
//         }

//         doc.save('aaaaaaaaaaaaaaaaaaaaaa.pdf')
//     })
// })

// </script>
// </html>
