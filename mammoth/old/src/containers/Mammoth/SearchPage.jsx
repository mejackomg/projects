import * as React from "react";
import * as _ from "lodash";
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
	SearchkitManager, SearchkitProvider,
	SearchBox, RefinementListFilter, MenuFilter,
	Hits, HitsStats, NoHits, Pagination, SortingSelector,
	SelectedFilters, ResetFilters, ItemHistogramList,
	Layout, LayoutBody, LayoutResults, TopBar,
	SideBar, ActionBar, ActionBarRow
} from "searchkit";

const host = "http://demo.searchkit.co/api/movies"
const searchkit = new SearchkitManager(host)

const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "http://www.imdb.com/title/" + result._source.imdbId
  const source:any = _.extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <a href="/userInterface/film" target="_blank">
        <img data-qa="poster" className={bemBlocks.item("poster")} src={result._source.poster} width="170" height="240"/>
        <div data-qa="title" className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}>
        </div>
      </a>
    </div>
  )
}

export default class SearchPage extends React.Component {
	render(){
		return (
			<SearchkitProvider searchkit={searchkit}>
		    <Layout>
				<Tabs style={{paddingTop:30}}>
					<Tab label="电影" />
					<Tab label="导演" />
					<Tab label="演员"/>
					<Tab label="剧本"/>
					<Tab label="舆情"/>
				</Tabs>
			  <Paper
				  zDepth={1}
				  style={{
				  background: '#424242',
				  width: '100%',//pictureHeight,
				  //height:60,
				  marginTop:1,
				  marginBottom:-60,
				  textAlign:'center',
				  borderRadius:'4px'
			  }}>
				  <SearchBox
					  autofocus={true}
					  searchOnChange={true}
					  placeholder="Search movies..."
					  prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
			  </Paper>
		      <LayoutBody>
		        <SideBar>
					<MenuFilter
						id="type"
						title="Movie Type"
						field="type.raw"
						listComponent={ItemHistogramList}/>
					<RefinementListFilter
						id="actors"
						title="Actors"
						field="actors.raw"
						operator="AND"
						size={10}/>
		        </SideBar>
		        <LayoutResults>
		          <ActionBar>
		            <ActionBarRow>
		              <HitsStats/>
									<SortingSelector options={[
										{label:"Relevance", field:"_score", order:"desc", defaultOption:true},
										{label:"Latest Releases", field:"released", order:"desc"},
										{label:"Earliest Releases", field:"released", order:"asc"}
									]}/>
		            </ActionBarRow>
		            <ActionBarRow>
		              <SelectedFilters/>
		              <ResetFilters/>
		            </ActionBarRow>
		          </ActionBar>
		          <Hits mod="sk-hits-grid" hitsPerPage={10} itemComponent={MovieHitsGridItem}
		            sourceFilter={["title", "poster", "imdbId"]}/>
		          <NoHits/>
				  <Pagination showNumbers={true}/>
		        </LayoutResults>
		      </LayoutBody>
		    </Layout>
		  </SearchkitProvider>
		)
	}
}
