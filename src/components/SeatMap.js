import React from 'react'

export default class SeatMap extends React.Component {

    render() {

        const ta = this.props.ta;
        const m = this.props.modal;

        return (
            <div id="checkinSeatDiv">
                <div id="seatStatusPanel" className="panel panel-default">
                    <div id="seatStatus" className="table-responsive">
                        <table
                            className="table table-bordered table-hover table-striped table-condensed">
                            <tbody>
                            <tr>
                                <th></th>
                                <th className="borderBottom">&nbsp;1&nbsp;</th>
                                <th className="borderBottom">&nbsp;2&nbsp;</th>
                                <th className="borderBottom">&nbsp;3&nbsp;</th>
                                <th className="borderBottom">&nbsp;4&nbsp;</th>
                                <th className="borderBottom">&nbsp;5&nbsp;</th>
                                <th className="borderBottom">&nbsp;6&nbsp;</th>
                                <th className="borderBottom">&nbsp;7&nbsp;</th>
                                <th className="borderBottom">&nbsp;8&nbsp;</th>
                                <th className="borderBottom">&nbsp;9&nbsp;</th>
                                <th className="borderBottom">10</th>
                                <th className="borderBottom">11</th>
                                <th className="borderBottom seat-safe">12</th>
                                <th className="borderBottom seat-safe">13</th>
                                <th className="borderBottom">14</th>
                                <th className="borderBottom">15</th>
                                <th className="borderBottom">16</th>
                                <th className="borderBottom">17</th>
                                <th className="borderBottom">18</th>
                                <th className="borderBottom">19</th>
                                <th className="borderBottom">20</th>
                                <th className="borderBottom">21</th>
                                <th className="borderBottom">22</th>
                                <th className="borderBottom">23</th>
                                <th className="borderBottom">24</th>
                                <th className="borderBottom">25</th>
                                <th className="borderBottom">26</th>
                                <th className="borderBottom">27</th>
                                <th className="borderBottom">28</th>
                                <th className="borderBottom">29</th>
                                <th className="borderBottom">30</th>
                            </tr>

                            <tr>
                                <td className="boardRight">F</td>
                                <td id="6" dangerouslySetInnerHTML=
                                    {{__html: m.value_6}}/>
                                <td id="12" dangerouslySetInnerHTML=
                                    {{__html: m.value_12}}/>
                                <td id="18" dangerouslySetInnerHTML=
                                    {{__html: m.value_18}}/>
                                <td id="24" dangerouslySetInnerHTML=
                                    {{__html: m.value_24}}/>
                                <td id="30" dangerouslySetInnerHTML=
                                    {{__html: m.value_30}}/>
                                <td id="36" dangerouslySetInnerHTML=
                                    {{__html: m.value_36}}/>
                                <td id="42" dangerouslySetInnerHTML=
                                    {{__html: m.value_42}}/>
                                <td id="48" dangerouslySetInnerHTML=
                                    {{__html: m.value_48}}/>
                                <td id="54" dangerouslySetInnerHTML=
                                    {{__html: m.value_54}}/>
                                <td id="60" dangerouslySetInnerHTML=
                                    {{__html: m.value_60}}/>
                                <td id="66" dangerouslySetInnerHTML=
                                    {{__html: m.value_66}}/>
                                <td id="72" dangerouslySetInnerHTML=
                                    {{__html: m.value_72}}/>
                                <td id="78" dangerouslySetInnerHTML=
                                    {{__html: m.value_78}}/>
                                <td id="84" dangerouslySetInnerHTML=
                                    {{__html: m.value_84}}/>
                                <td id="90" dangerouslySetInnerHTML=
                                    {{__html: m.value_90}}/>
                                <td id="96" dangerouslySetInnerHTML=
                                    {{__html: m.value_96}}/>
                                <td id="102" dangerouslySetInnerHTML=
                                    {{__html: m.value_102}}/>
                                <td id="108" dangerouslySetInnerHTML=
                                    {{__html: m.value_108}}/>
                                <td id="114" dangerouslySetInnerHTML=
                                    {{__html: m.value_114}}/>
                                <td id="120" dangerouslySetInnerHTML=
                                    {{__html: m.value_120}}/>
                                <td id="126" dangerouslySetInnerHTML=
                                    {{__html: m.value_126}}/>
                                <td id="132" dangerouslySetInnerHTML=
                                    {{__html: m.value_132}}/>
                                <td id="138" dangerouslySetInnerHTML=
                                    {{__html: m.value_138}}/>
                                <td id="144" dangerouslySetInnerHTML=
                                    {{__html: m.value_144}}/>
                                <td id="150" dangerouslySetInnerHTML=
                                    {{__html: m.value_150}}/>
                                <td id="156" dangerouslySetInnerHTML=
                                    {{__html: m.value_156}}/>
                                <td id="162" dangerouslySetInnerHTML=
                                    {{__html: m.value_162}}/>
                                <td id="168" dangerouslySetInnerHTML=
                                    {{__html: m.value_168}}/>
                                <td id="174" dangerouslySetInnerHTML=
                                    {{__html: m.value_174}}/>
                                <td id="180" dangerouslySetInnerHTML=
                                    {{__html: m.value_180}}/>
                            </tr>
                            <tr>
                                <td className="boardRight">E</td>
                                <td id="5" dangerouslySetInnerHTML=
                                    {{__html: m.value_5}}/>
                                <td id="11" dangerouslySetInnerHTML=
                                    {{__html: m.value_11}}/>
                                <td id="17" dangerouslySetInnerHTML=
                                    {{__html: m.value_17}}/>
                                <td id="23" dangerouslySetInnerHTML=
                                    {{__html: m.value_23}}/>
                                <td id="29" dangerouslySetInnerHTML=
                                    {{__html: m.value_29}}/>
                                <td id="35" dangerouslySetInnerHTML=
                                    {{__html: m.value_35}}/>
                                <td id="41" dangerouslySetInnerHTML=
                                    {{__html: m.value_41}}/>
                                <td id="47" dangerouslySetInnerHTML=
                                    {{__html: m.value_47}}/>
                                <td id="53" dangerouslySetInnerHTML=
                                    {{__html: m.value_53}}/>
                                <td id="59" dangerouslySetInnerHTML=
                                    {{__html: m.value_59}}/>
                                <td id="65" dangerouslySetInnerHTML=
                                    {{__html: m.value_65}}/>
                                <td id="71" dangerouslySetInnerHTML=
                                    {{__html: m.value_71}}/>
                                <td id="77" dangerouslySetInnerHTML=
                                    {{__html: m.value_77}}/>
                                <td id="83" dangerouslySetInnerHTML=
                                    {{__html: m.value_83}}/>
                                <td id="89" dangerouslySetInnerHTML=
                                    {{__html: m.value_89}}/>
                                <td id="95" dangerouslySetInnerHTML=
                                    {{__html: m.value_95}}/>
                                <td id="101" dangerouslySetInnerHTML=
                                    {{__html: m.value_101}}/>
                                <td id="107" dangerouslySetInnerHTML=
                                    {{__html: m.value_107}}/>
                                <td id="113" dangerouslySetInnerHTML=
                                    {{__html: m.value_113}}/>
                                <td id="119" dangerouslySetInnerHTML=
                                    {{__html: m.value_119}}/>
                                <td id="125" dangerouslySetInnerHTML=
                                    {{__html: m.value_125}}/>
                                <td id="131" dangerouslySetInnerHTML=
                                    {{__html: m.value_131}}/>
                                <td id="137" dangerouslySetInnerHTML=
                                    {{__html: m.value_137}}/>
                                <td id="143" dangerouslySetInnerHTML=
                                    {{__html: m.value_143}}/>
                                <td id="149" dangerouslySetInnerHTML=
                                    {{__html: m.value_149}}/>
                                <td id="155" dangerouslySetInnerHTML=
                                    {{__html: m.value_155}}/>
                                <td id="161" dangerouslySetInnerHTML=
                                    {{__html: m.value_161}}/>
                                <td id="167" dangerouslySetInnerHTML=
                                    {{__html: m.value_167}}/>
                                <td id="173" dangerouslySetInnerHTML=
                                    {{__html: m.value_173}}/>
                                <td id="179" dangerouslySetInnerHTML=
                                    {{__html: m.value_179}}/>
                            </tr>
                            <tr>
                                <td className="boardRight">D</td>
                                <td id="4" dangerouslySetInnerHTML=
                                    {{__html: m.value_4}}/>
                                <td id="10" dangerouslySetInnerHTML=
                                    {{__html: m.value_10}}/>
                                <td id="16" dangerouslySetInnerHTML=
                                    {{__html: m.value_16}}/>
                                <td id="22" dangerouslySetInnerHTML=
                                    {{__html: m.value_22}}/>
                                <td id="28" dangerouslySetInnerHTML=
                                    {{__html: m.value_28}}/>
                                <td id="34" dangerouslySetInnerHTML=
                                    {{__html: m.value_34}}/>
                                <td id="40" dangerouslySetInnerHTML=
                                    {{__html: m.value_40}}/>
                                <td id="46" dangerouslySetInnerHTML=
                                    {{__html: m.value_46}}/>
                                <td id="52" dangerouslySetInnerHTML=
                                    {{__html: m.value_52}}/>
                                <td id="58" dangerouslySetInnerHTML=
                                    {{__html: m.value_58}}/>
                                <td id="64" dangerouslySetInnerHTML=
                                    {{__html: m.value_64}}/>
                                <td id="70" dangerouslySetInnerHTML=
                                    {{__html: m.value_70}}/>
                                <td id="76" dangerouslySetInnerHTML=
                                    {{__html: m.value_76}}/>
                                <td id="82" dangerouslySetInnerHTML=
                                    {{__html: m.value_82}}/>
                                <td id="88" dangerouslySetInnerHTML=
                                    {{__html: m.value_88}}/>
                                <td id="94" dangerouslySetInnerHTML=
                                    {{__html: m.value_94}}/>
                                <td id="100" dangerouslySetInnerHTML=
                                    {{__html: m.value_100}}/>
                                <td id="106" dangerouslySetInnerHTML=
                                    {{__html: m.value_106}}/>
                                <td id="112" dangerouslySetInnerHTML=
                                    {{__html: m.value_112}}/>
                                <td id="118" dangerouslySetInnerHTML=
                                    {{__html: m.value_118}}/>
                                <td id="124" dangerouslySetInnerHTML=
                                    {{__html: m.value_124}}/>
                                <td id="130" dangerouslySetInnerHTML=
                                    {{__html: m.value_130}}/>
                                <td id="136" dangerouslySetInnerHTML=
                                    {{__html: m.value_136}}/>
                                <td id="142" dangerouslySetInnerHTML=
                                    {{__html: m.value_142}}/>
                                <td id="148" dangerouslySetInnerHTML=
                                    {{__html: m.value_148}}/>
                                <td id="154" dangerouslySetInnerHTML=
                                    {{__html: m.value_154}}/>
                                <td id="160" dangerouslySetInnerHTML=
                                    {{__html: m.value_160}}/>
                                <td id="166" dangerouslySetInnerHTML=
                                    {{__html: m.value_166}}/>
                                <td id="172" dangerouslySetInnerHTML=
                                    {{__html: m.value_172}}/>
                                <td id="178" dangerouslySetInnerHTML=
                                    {{__html: m.value_178}}/>
                            </tr>
                            <tr>
                                <td colSpan="32">
                                    过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    道
                                </td>
                            </tr>
                            <tr>
                                <td className="boardRight">C</td>
                                <td id="3" dangerouslySetInnerHTML=
                                    {{__html: m.value_3}}/>
                                <td id="9" dangerouslySetInnerHTML=
                                    {{__html: m.value_9}}/>
                                <td id="15" dangerouslySetInnerHTML=
                                    {{__html: m.value_15}}/>
                                <td id="21" dangerouslySetInnerHTML=
                                    {{__html: m.value_21}}/>
                                <td id="27" dangerouslySetInnerHTML=
                                    {{__html: m.value_27}}/>
                                <td id="33" dangerouslySetInnerHTML=
                                    {{__html: m.value_33}}/>
                                <td id="39" dangerouslySetInnerHTML=
                                    {{__html: m.value_39}}/>
                                <td id="45" dangerouslySetInnerHTML=
                                    {{__html: m.value_45}}/>
                                <td id="51" dangerouslySetInnerHTML=
                                    {{__html: m.value_51}}/>
                                <td id="57" dangerouslySetInnerHTML=
                                    {{__html: m.value_57}}/>
                                <td id="63" dangerouslySetInnerHTML=
                                    {{__html: m.value_63}}/>
                                <td id="69" dangerouslySetInnerHTML=
                                    {{__html: m.value_69}}/>
                                <td id="75" dangerouslySetInnerHTML=
                                    {{__html: m.value_75}}/>
                                <td id="81" dangerouslySetInnerHTML=
                                    {{__html: m.value_81}}/>
                                <td id="87" dangerouslySetInnerHTML=
                                    {{__html: m.value_87}}/>
                                <td id="93" dangerouslySetInnerHTML=
                                    {{__html: m.value_93}}/>
                                <td id="99" dangerouslySetInnerHTML=
                                    {{__html: m.value_99}}/>
                                <td id="105" dangerouslySetInnerHTML=
                                    {{__html: m.value_105}}/>
                                <td id="111" dangerouslySetInnerHTML=
                                    {{__html: m.value_111}}/>
                                <td id="117" dangerouslySetInnerHTML=
                                    {{__html: m.value_117}}/>
                                <td id="123" dangerouslySetInnerHTML=
                                    {{__html: m.value_123}}/>
                                <td id="129" dangerouslySetInnerHTML=
                                    {{__html: m.value_129}}/>
                                <td id="135" dangerouslySetInnerHTML=
                                    {{__html: m.value_135}}/>
                                <td id="141" dangerouslySetInnerHTML=
                                    {{__html: m.value_141}}/>
                                <td id="147" dangerouslySetInnerHTML=
                                    {{__html: m.value_147}}/>
                                <td id="153" dangerouslySetInnerHTML=
                                    {{__html: m.value_153}}/>
                                <td id="159" dangerouslySetInnerHTML=
                                    {{__html: m.value_159}}/>
                                <td id="165" dangerouslySetInnerHTML=
                                    {{__html: m.value_165}}/>
                                <td id="171" dangerouslySetInnerHTML=
                                    {{__html: m.value_171}}/>
                                <td id="177" dangerouslySetInnerHTML=
                                    {{__html: m.value_177}}/>
                            </tr>
                            <tr>
                                <td className="boardRight">B</td>
                                <td id="2" dangerouslySetInnerHTML=
                                    {{__html: m.value_2}}/>
                                <td id="8" dangerouslySetInnerHTML=
                                    {{__html: m.value_8}}/>
                                <td id="14" dangerouslySetInnerHTML=
                                    {{__html: m.value_14}}/>
                                <td id="20" dangerouslySetInnerHTML=
                                    {{__html: m.value_20}}/>
                                <td id="26" dangerouslySetInnerHTML=
                                    {{__html: m.value_26}}/>
                                <td id="32" dangerouslySetInnerHTML=
                                    {{__html: m.value_32}}/>
                                <td id="38" dangerouslySetInnerHTML=
                                    {{__html: m.value_38}}/>
                                <td id="44" dangerouslySetInnerHTML=
                                    {{__html: m.value_44}}/>
                                <td id="50" dangerouslySetInnerHTML=
                                    {{__html: m.value_50}}/>
                                <td id="56" dangerouslySetInnerHTML=
                                    {{__html: m.value_56}}/>
                                <td id="62" dangerouslySetInnerHTML=
                                    {{__html: m.value_62}}/>
                                <td id="68" dangerouslySetInnerHTML=
                                    {{__html: m.value_68}}/>
                                <td id="74" dangerouslySetInnerHTML=
                                    {{__html: m.value_74}}/>
                                <td id="80" dangerouslySetInnerHTML=
                                    {{__html: m.value_80}}/>
                                <td id="86" dangerouslySetInnerHTML=
                                    {{__html: m.value_86}}/>
                                <td id="92" dangerouslySetInnerHTML=
                                    {{__html: m.value_92}}/>
                                <td id="98" dangerouslySetInnerHTML=
                                    {{__html: m.value_98}}/>
                                <td id="104" dangerouslySetInnerHTML=
                                    {{__html: m.value_104}}/>
                                <td id="110" dangerouslySetInnerHTML=
                                    {{__html: m.value_110}}/>
                                <td id="116" dangerouslySetInnerHTML=
                                    {{__html: m.value_116}}/>
                                <td id="122" dangerouslySetInnerHTML=
                                    {{__html: m.value_122}}/>
                                <td id="128" dangerouslySetInnerHTML=
                                    {{__html: m.value_128}}/>
                                <td id="134" dangerouslySetInnerHTML=
                                    {{__html: m.value_134}}/>
                                <td id="140" dangerouslySetInnerHTML=
                                    {{__html: m.value_140}}/>
                                <td id="146" dangerouslySetInnerHTML=
                                    {{__html: m.value_146}}/>
                                <td id="152" dangerouslySetInnerHTML=
                                    {{__html: m.value_152}}/>
                                <td id="158" dangerouslySetInnerHTML=
                                    {{__html: m.value_158}}/>
                                <td id="164" dangerouslySetInnerHTML=
                                    {{__html: m.value_164}}/>
                                <td id="170" dangerouslySetInnerHTML=
                                    {{__html: m.value_170}}/>
                                <td id="176" dangerouslySetInnerHTML=
                                    {{__html: m.value_176}}/>
                            </tr>
                            <tr>
                                <td className="boardRight">A</td>
                                <td id="1" dangerouslySetInnerHTML=
                                    {{__html: m.value_1}}/>
                                <td id="7" dangerouslySetInnerHTML=
                                    {{__html: m.value_7}}/>
                                <td id="13" dangerouslySetInnerHTML=
                                    {{__html: m.value_13}}/>
                                <td id="19" dangerouslySetInnerHTML=
                                    {{__html: m.value_19}}/>
                                <td id="25" dangerouslySetInnerHTML=
                                    {{__html: m.value_25}}/>
                                <td id="31" dangerouslySetInnerHTML=
                                    {{__html: m.value_31}}/>
                                <td id="37" dangerouslySetInnerHTML=
                                    {{__html: m.value_37}}/>
                                <td id="43" dangerouslySetInnerHTML=
                                    {{__html: m.value_43}}/>
                                <td id="49" dangerouslySetInnerHTML=
                                    {{__html: m.value_49}}/>
                                <td id="55" dangerouslySetInnerHTML=
                                    {{__html: m.value_55}}/>
                                <td id="61" dangerouslySetInnerHTML=
                                    {{__html: m.value_61}}/>
                                <td id="67" dangerouslySetInnerHTML=
                                    {{__html: m.value_67}}/>
                                <td id="73" dangerouslySetInnerHTML=
                                    {{__html: m.value_73}}/>
                                <td id="79" dangerouslySetInnerHTML=
                                    {{__html: m.value_79}}/>
                                <td id="85" dangerouslySetInnerHTML=
                                    {{__html: m.value_85}}/>
                                <td id="91" dangerouslySetInnerHTML=
                                    {{__html: m.value_91}}/>
                                <td id="97" dangerouslySetInnerHTML=
                                    {{__html: m.value_97}}/>
                                <td id="103" dangerouslySetInnerHTML=
                                    {{__html: m.value_103}}/>
                                <td id="109" dangerouslySetInnerHTML=
                                    {{__html: m.value_109}}/>
                                <td id="115" dangerouslySetInnerHTML=
                                    {{__html: m.value_115}}/>
                                <td id="121" dangerouslySetInnerHTML=
                                    {{__html: m.value_121}}/>
                                <td id="127" dangerouslySetInnerHTML=
                                    {{__html: m.value_127}}/>
                                <td id="133" dangerouslySetInnerHTML=
                                    {{__html: m.value_133}}/>
                                <td id="139" dangerouslySetInnerHTML=
                                    {{__html: m.value_139}}/>
                                <td id="145" dangerouslySetInnerHTML=
                                    {{__html: m.value_145}}/>
                                <td id="151" dangerouslySetInnerHTML=
                                    {{__html: m.value_151}}/>
                                <td id="157" dangerouslySetInnerHTML=
                                    {{__html: m.value_157}}/>
                                <td id="163" dangerouslySetInnerHTML=
                                    {{__html: m.value_163}}/>
                                <td id="169" dangerouslySetInnerHTML=
                                    {{__html: m.value_169}}/>
                                <td id="175" dangerouslySetInnerHTML=
                                    {{__html: m.value_175}}/>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <th></th>
                                <th className="boardTop">&nbsp;1&nbsp;</th>
                                <th className="boardTop">&nbsp;2&nbsp;</th>
                                <th className="boardTop">&nbsp;3&nbsp;</th>
                                <th className="boardTop">&nbsp;4&nbsp;</th>
                                <th className="boardTop">&nbsp;5&nbsp;</th>
                                <th className="boardTop">&nbsp;6&nbsp;</th>
                                <th className="boardTop">&nbsp;7&nbsp;</th>
                                <th className="boardTop">&nbsp;8&nbsp;</th>
                                <th className="boardTop">&nbsp;9&nbsp;</th>
                                <th className="boardTop">10</th>
                                <th className="boardTop">11</th>
                                <th className="boardTop seat-safe">12</th>
                                <th className="boardTop seat-safe">13</th>
                                <th className="boardTop">14</th>
                                <th className="boardTop">15</th>
                                <th className="boardTop">16</th>
                                <th className="boardTop">17</th>
                                <th className="boardTop">18</th>
                                <th className="boardTop">19</th>
                                <th className="boardTop">20</th>
                                <th className="boardTop">21</th>
                                <th className="boardTop">22</th>
                                <th className="boardTop">23</th>
                                <th className="boardTop">24</th>
                                <th className="boardTop">25</th>
                                <th className="boardTop">26</th>
                                <th className="boardTop">27</th>
                                <th className="boardTop">28</th>
                                <th className="boardTop">29</th>
                                <th className="boardTop">30</th>
                            </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}