var React = require('react-native')
var moment = require('moment')

var TopicRow = require('./topicRow')
var Topic = require('../scene/topic')

var sceneConfig = require('../config/sceneConfig')
var config = require('../config')

var window = require('../util/window')
var { width, height } = window.get()

var {
    View,
    StyleSheet,
    ScrollView,
    Component,
    Text,
    StatusBarIOS,
    Image,
    ListView,
    TouchableHighlight,
    Navigator,
    } = React


class UserTopicPage extends Component {
    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.data = this.props.data || []
        this.state = {
            ds: ds.cloneWithRows(this.data)
        }
    }


    _onRowPress(topic) {
        Navigator.getContext(this).push({
            component: Topic,
            sceneConfig: sceneConfig.customFloatFromRight,
            name: 'topic',
            props: {
                topic: topic,
                from: 'user'
            }
        });
    }


    _renderRowFooter(topic) {
        var date = moment(topic.last_reply_at).startOf('minute').fromNow();
        let dateItem = (
            <Text
                key='dateText'
                style={[styles['topicFooter text'],styles['topicFooter date']]}>
                {date}
            </Text>
        )

        let authorItem = (
            <Text
                key='authorText'
                style={[styles['topicFooter text'],styles['topicFooter author']]}>
                {topic.author.loginname}
            </Text>
        )


        return [dateItem, authorItem]
    }


    _renderRow(topic) {
        return (
            <TopicRow
                onPress={this._onRowPress.bind(this)}
                topic={topic}
                footer={this._renderRowFooter(topic)}
                ></TopicRow>
        )
    }


    render() {
        return (
            <View style={[styles.container,this.props.style]}>
                <ListView
                    showsVerticalScrollIndicator={true}
                    initialListSize={10}
                    pagingEnabled={false}
                    removeClippedSubviews={true}
                    dataSource={this.state.ds}
                    renderRow={this._renderRow.bind(this)}
                    />
            </View>
        )
    }
}


var styles = StyleSheet.create({
    container: {
        width: width
    },
    "topicFooter text": {
        "fontSize": 11,
        "color": "rgba(0, 0, 0, 0.3)"
    },
    "topicFooter date": {
        "position": "absolute",
        "right": 0,
        "top": 0
    },
    "topicFooter author": {
        position: 'absolute',
        left: 0,
        top: 0
    }
})


module.exports = UserTopicPage