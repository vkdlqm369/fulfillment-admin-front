<template>

  <div>
    <el-row>
      <el-col class="oline-title">

        <strong>공지사항</strong>

      </el-col>

    </el-row>

    <el-row style="margin: 0px auto; width:99%;">

      <div style="height: 60px;">
        <el-radio-group v-model="onlineNotice" size="small" style="margin-top: 15px;">
          <el-radio-button label="">전체</el-radio-button>
          <el-radio-button label="01">운영안내</el-radio-button>
          <el-radio-button label="02">개발사항</el-radio-button>
          <el-radio-button label="03">오류</el-radio-button>
          <el-radio-button label="04">정상화</el-radio-button>
        </el-radio-group>
      </div>

      <el-row style="margin-bottom:10px;">

        <div style="font-size:14px; font-weight:bold;">
          <span>공지사항 검색</span>
        </div>
      </el-row>

      <el-row class="sb-border-line">
        <div>
          <el-col :span="3">등록일자</el-col>
          <el-col :span="15">
            <date-range
              :start-date.sync="sbForm.startDate"
              :end-date.sync="sbForm.endDate"
              format="yyyy-MM-dd"
              start-style="width: 130px"
              end-style="width: 130px"
            />
            <common-date-buttons
              :date-list="['오늘', '1주일', '1개월', '3개월', '6개월']"
              :from.sync="sbForm.startDate"
              :to.sync="sbForm.endDate"
            />
          </el-col>
          <el-col :span="2">노출개수</el-col>
          <el-col :span="12">
            <el-select v-model="pageSize">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </div>
        <div>
          <el-col :span="3">조건항목</el-col>
          <el-col :span="15">
            <el-select v-model="sbForm.bltndLaclCd" placeholder="구분" :clearable="true" @change="getSelectOptionList('002')">
              <el-option
                v-for="item in selectOptionList1"
                :key="item.bltndClsfCd"
                :label="item.bltndClsfNm"
                :value="item.bltndClsfCd"
                :clearable="true"
              />
            </el-select>
            <el-select
              v-model="sbForm.bltndMidclCd"
              placeholder="항목"
              :clearable="true"
            >
              <el-option
                v-for="item in selectOptionList2"
                :key="item.bltndClsfCd"
                :label="item.bltndClsfNm"
                :value="item.bltndClsfCd"
              />
            </el-select>
          </el-col>

          <el-col :span="2">조건검색</el-col>
          <el-col :span="12">

            <el-select
              v-model="sbForm.searchCondition"
              placeholder="선택"
              :clearable="true"
            >
              <el-option
                v-for="item in selectSearchCondition"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-input v-model="sbForm.searchKeyword" clearable @keyup.native.enter="btnGetDataList" />
            <el-button class="sb-search-btn" @click="btnGetDataList">
              검색
            </el-button>
          </el-col>

        </div>

      </el-row>

      <el-row class="sb-function-line">

        <div style="font-size:14px; font-weight:bold; margin-bottom:5px;">
          <span>결과 조회 (총 {{ sbForm.total }} 건)</span>
        </div>
      </el-row>

      <el-row class="sb-table-line">

        <el-table
          v-loading="isLoading"
          :data="ServiceDataTable"
          border
          style="width: 100%;"
          :cell-class-name="tableCellClassName"
        >
          <el-table-column align="center" label="No." width="50">
            <!-- <template slot-scope="scope">
              {{ scope.$index + 1 + ((sbForm.currentPage-1)*sbForm.pageSize) }}
            </template> -->
            <template slot-scope="scope">
              {{ scope.row.rn }}
            </template>
          </el-table-column>
          <el-table-column
            label="중요도"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <span
                :class="{
                  noticeNormal: scope.row.bltndDgimpDivCd === '001',
                  important: scope.row.bltndDgimpDivCd === '002',
                  emergency: scope.row.bltndDgimpDivCd === '003'
                }"
              >
                {{ _commCodeTypeVal('게시물중요도구분코드', scope.row.bltndDgimpDivCd) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="shmaNm"
            label="사이트"
            align="center"
            width="130"
            class-name="nowrap-column"
          >
            <template slot-scope="scope">
              <span :style="{ 'font-weight': scope.row.disNo === '1' || scope.row.bltndDgimpDivCd === '003' ? 'bold' : ''}">{{ scope.row.shmaNm }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bltndTtlNm"
            label="제목"
            align="left"
          >
            <template slot-scope="scope">
              <div style="cursor: pointer;" @click="detailview(scope.row.bltndSeqno)">
                <span :style="{ 'font-weight': scope.row.disNo === '1' || scope.row.bltndDgimpDivCd === '003' ? 'bold' : ''}">
                  {{ scope.row.bltndTtlNm }}
                  <img v-if="scope.row.newNoticeYn === 'Y'" style="vertical-align: middle" src="@/styles/icons/buttons/new-redcircle.png" alt="new" width="15" height="15">
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="fstRegsDt"
            label="등록일시"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <span :style="{ 'font-weight': scope.row.disNo === '1' || scope.row.bltndDgimpDivCd === '003' ? 'bold' : ''}">{{ scope.row.fstRegsDt | withFormat }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="첨부파일"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-popover
                v-if="scope.row.files != null && scope.row.files.length > 0"
                placement="right"
                trigger="hover"
                popper-class="del-arrow"
              >
                <ul style="padding:5px; margin: unset;">
                  <li v-for="(file, i) in scope.row.files" :key="i">
                    <span>{{ file.bltndAtchFileNm }}</span>
                  </li>
                </ul>
                <el-button slot="reference" type="text" class="text-btn" @click="download(scope.row.files)"><span :style="{ 'font-weight': scope.row.disNo === '1' || scope.row.bltndDgimpDivCd === '003' ? 'bold' : ''}">첨부파일 {{ scope.row.files.length }} 개</span></el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>

        <br>
        <div v-if="sbForm.total > 0" align="center">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="sbForm.total"
            :page-size="sbForm.pageSize"
            :current-page="sbForm.currentPage"
            @current-change="handleCurrentChange"
          />
        </div>
        <br>
      </el-row>

    </el-row>

  </div>

</template>

<script>

import { sendPostData } from '@/api/common/api'
import commFnc from '@/utils/comm-fnc'
import commonMixins from '@/utils/mixins/common-mixins'
import dateMixins from '@/utils/mixins/date-mixins'
import { mapGetters } from 'vuex'
import NoticeInfo from '@/form-model/online-border/notice-info'
import SelectOption from '@/form-model/online-border/select-option'

export default {
  mixins: [commFnc, commonMixins, dateMixins],
  data() {
    return {
      sbForm: new NoticeInfo(),
      selectOption: new SelectOption(),
      ServiceDataTable: [],
      index: null,
      pageSize: 15,
      options: [
        { value: 15, label: '15' },
        { value: 30, label: '30' },
        { value: 50, label: '50' },
        { value: 100, label: '100' }
      ],
      selectOptionList1: [],
      selectOptionList2: [],
      selectSearchCondition: [
        { value: '001', label: '제목 + 내용' },
        { value: '002', label: '제목' },
        { value: '003', label: '내용' },
        { value: '004', label: '사이트' }
      ],
      onlineNotice: ''
    }
  },
  computed: {
    ...mapGetters({
      svcAcntId: 'svcAcntId',
      allUserType: 'ALL_USER_TYPE'
    })
  },
  watch: {
    $route(to, from) {
      if (to.path === '/online-ask/notice') {
        this.setMode()
        this.sbForm.bltndLaclCd = ''
        this.sbForm.bltndMidclCd = ''
        this.sbForm.searchKeyword = ''
        this.sbForm.searchCondition = ''
      }
    },
    onlineNotice(newValue) {
      this.sbForm.bltndLaclCd = newValue
      this.getSelectOptionList('002')
      this.handleCurrentChange(1)
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.$_date_initDate(this.sbForm, { months: 3 })
  },
  methods: {
    init() {
      this.setMode()
    },
    setMode() {
      if (this.$route.query.idx !== undefined) {
        this.sbForm.bltndSeqno = this.$route.query.idx
      }
      if (this.$route.query.searchKeyword !== undefined) {
        this.sbForm.searchKeyword = this.$route.query.searchKeyword
      }
      if (this.$route.query.searchCondition !== undefined) {
        this.sbForm.searchCondition = this.$route.query.searchCondition
      }
      this.getSelectOptionList('001')
      this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.sbForm.currentPage = val
      console.log(this.sbForm.currentPage)
      this.getDataList()
    },
    detailview(idx) {
      const popupProperty = {
        url: `/#/notice/detail?timestamp=${new Date().getTime()}&idx=${idx}`,
        name: 'notice',
        option: this.$_popup_toWindowCenter(1220, 954)
      }
      this.$_popup_openPopup(popupProperty, {})
    },
    getSelectOptionList(searchCondition) {
      this.selectOption.searchCondition = searchCondition
      this.selectOption.bltndClsfCd = this.sbForm.bltndLaclCd
      this.selectOption.bltnbSeqno = 1
      return new Promise((resolve, reject) => {
        sendPostData('/searchOption', this.selectOption)
          .then((response) => {
            if (searchCondition === '001') {
              this.selectOptionList1 = response.data.list
            } else if (searchCondition === '002') {
              this.sbForm.bltndMidclCd = ''
              this.selectOptionList2 = response.data.list
            }
            resolve(true)
          })
          .catch((err) => {
            console.log(err)
            reject(false)
          })
      })
    },
    btnGetDataList() {
      this.sbForm.currentPage = 1
      this.getDataList()
    },
    getDataList() {
      this.sbForm.bltnbSeqno = 1
      this.sbForm.sortOption = 'FST_REGS_DT'
      this.sbForm.sort = 'DESC'
      this.sbForm.pageSize = this.pageSize
      this.sbForm.svcAcntId = this.svcAcntId
      this.sbForm.allUserType = this.allUserType

      this.startLoading()
      return new Promise((resolve, reject) => {
        sendPostData('/notice', this.sbForm)
          .then((response) => {
            this.ServiceDataTable = response.data.list
            this.sbForm.total = response.data.metaData.total
            this.sbForm.currentPage = (this.ServiceDataTable.length > 0) ? response.data.metaData.currentPage : 1
            if (this.sbForm.bltndSeqno !== null && this.sbForm.bltndSeqno !== 0) {
              this.detailview(this.$route.query.idx)
              this.sbForm.bltndSeqno = null
            }
            resolve(true)
          })
          .catch((err) => {
            console.log(err)
            reject(false)
          })
          .finally(() => {
            this.endLoading() // 로딩 화면 끝
          })
      })
    },
    download(files) {
      /* 테이블의 첨부파일 다운로드 */
    },
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      if (row.bltndExpoFrYmd !== null && row.bltndExpoToYmd !== null) {
        return 'title-column'
      }
    }
  }
}

</script>

<style scoped>
.font_style {
  font-size: 12px;
  width:100%;
  line-height:25px;
}

.nowrap-column .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-table .title-column {
  background: #fafafaf6;
  color:black;
  font-weight: bold;
}

</style>
